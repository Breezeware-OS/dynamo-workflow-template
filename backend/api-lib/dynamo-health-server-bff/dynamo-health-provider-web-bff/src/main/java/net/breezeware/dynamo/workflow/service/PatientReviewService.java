package net.breezeware.dynamo.workflow.service;

import static net.breezeware.dynamo.workflow.enumeration.IntakeFormStatus.COMPLETED;
import static net.breezeware.dynamo.workflow.enumeration.IntakeFormStatus.PHYSICIAN_REVIEWED;
import static net.breezeware.dynamo.workflow.enumeration.IntakeFormStatus.PHYSICIAN_REVIEW_NEEDED;
import static net.breezeware.dynamo.workflow.enumeration.IntakeFormStatus.REVIEW_PENDING;

import java.time.DateTimeException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.TreeMap;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;

import com.fasterxml.jackson.databind.JsonNode;
import com.querydsl.core.BooleanBuilder;

import net.breezeware.dynamo.utils.exception.DynamoException;
import net.breezeware.dynamo.workflow.dto.ProcessTaskData;
import net.breezeware.dynamo.workflow.dto.TaskForm;
import net.breezeware.dynamo.workflow.entity.IntakeForm;
import net.breezeware.dynamo.workflow.entity.ProcessDomainEntity;
import net.breezeware.dynamo.workflow.entity.QIntakeForm;
import net.breezeware.dynamo.workflow.enumeration.IntakeFormStatus;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class PatientReviewService {

    private static final Set<String> DEFAULT_VALID_PARAMETERS = Set.of("page-no", "page-size", "sort");
    private static final String TASK_DEFINITION_PROVIDER_REVIEW_KEY = "physician-review-patient-information";
    private final IntakeFormService intakeFormService;
    private final DynamoHealthShowcaseProcessService dynamoHealthShowcaseProcessService;

    /**
     * Retrieves a page of intake forms based on the provided search/filter
     * parameters and pagination criteria.
     * @param  searchOrFilterParameters A MultiValueMap containing the search/filter
     *                                  parameters.
     * @param  pageable                 The pagination criteria.
     * @return                          A Page containing the retrieved intake
     *                                  forms.
     * @throws DynamoException          if there is an error while retrieving the
     *                                  intake forms.
     */
    public Page<IntakeForm> retrievePatientIntakeForms(MultiValueMap<String, String> searchOrFilterParameters,
            Pageable pageable) {
        log.info("Entering retrievePatientIntakeForms()");
        // validate query parameters
        Set<String> validParameters = new HashSet<>(DEFAULT_VALID_PARAMETERS);
        validParameters.add("patient-name");
        validParameters.add("intake-form-from-date");
        validParameters.add("intake-form-to-date");
        validateParameters(validParameters, searchOrFilterParameters.keySet());
        // validate sort criteria
        validateSortCriteria(searchOrFilterParameters.getFirst("sort"));
        BooleanBuilder booleanBuilder = buildSearchOrFilterPredicate(searchOrFilterParameters);
        Page<IntakeForm> intakeFormPage = intakeFormService.retrievePageEntitiesWithPredicate(booleanBuilder, pageable);
        Map<String, IntakeFormStatus> statusMapping = new HashMap<>();
        statusMapping.put(PHYSICIAN_REVIEW_NEEDED.getStatus(), REVIEW_PENDING);
        statusMapping.put(PHYSICIAN_REVIEWED.getStatus(), COMPLETED);

        intakeFormPage.forEach(intakeForm -> {
            String currentStatus = intakeForm.getStatus();
            IntakeFormStatus newStatus = statusMapping.get(currentStatus);
            if (newStatus != null) {
                intakeForm.setStatus(newStatus.getStatus());
            }

        });
        log.info("Leaving retrievePatientIntakeForms(), # of IntakeForms: {}", intakeFormPage.getTotalElements());
        return intakeFormPage;
    }

    /**
     * Validates that the actual parameters are among the allowed parameters.
     * @param  allowedParameters A Set of allowed parameter names.
     * @param  actualParameters  A Set of actual parameter names.
     * @throws DynamoException   if unknown parameters are found.
     */
    private void validateParameters(Set<String> allowedParameters, Set<String> actualParameters)
            throws DynamoException {
        log.info("Entering validateParameters()");
        List<String> invalidParameters =
                actualParameters.stream().filter(param -> !allowedParameters.contains(param)).toList();
        if (!invalidParameters.isEmpty()) {
            log.error("Parameter(s) {} not supported!", invalidParameters);
            throw new DynamoException("Unknown parameter(s) %s found".formatted(invalidParameters),
                    HttpStatus.BAD_REQUEST);
        }

        log.info("Leaving validateParameters()");
    }

    /**
     * Validates the sort criteria.
     * @param  sortCriteria    the sort criteria to be validated.
     * @throws DynamoException if there is an error in the sort criteria.
     */
    void validateSortCriteria(String sortCriteria) {
        log.info("Entering validateSortCriteria()");
        if (Objects.nonNull(sortCriteria) && !sortCriteria.isBlank()) {
            String[] sortSplit = sortCriteria.split(",", 2);
            if (sortSplit.length != 2) {
                throw new DynamoException("Invalid sort criteria '%s'. Should be something like 'id,ASC' or 'id,asc'"
                        .formatted(sortCriteria), HttpStatus.BAD_REQUEST);
            }

            String sortBy = sortSplit[0].trim();
            String sortOrder = sortSplit[1].trim().toLowerCase();
            if (!sortOrder.equalsIgnoreCase("asc") && !sortOrder.equalsIgnoreCase("desc")) {
                throw new DynamoException("Invalid sort-order [%s] for sort-by [%s]".formatted(sortOrder, sortBy),
                        HttpStatus.BAD_REQUEST);
            }

        }

        log.info("Leaving validateSortCriteria()");

    }

    /**
     * Builds a BooleanBuilder predicate for searching or filtering intake forms
     * based on the specified parameters.
     * @param  searchOrFilterParameters A MultiValueMap containing search or filter
     *                                  parameters.
     * @return                          A BooleanBuilder containing the constructed
     *                                  predicate.
     * @throws DynamoException          If an error occurs during predicate
     *                                  construction.
     */
    private BooleanBuilder buildSearchOrFilterPredicate(MultiValueMap<String, String> searchOrFilterParameters)
            throws DynamoException {
        log.info("Entering buildSearchOrFilterPredicate()");
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        QIntakeForm intakeForm = QIntakeForm.intakeForm;

        booleanBuilder.and(intakeForm.status.equalsIgnoreCase(PHYSICIAN_REVIEW_NEEDED.getStatus())
                .or(intakeForm.status.equalsIgnoreCase(PHYSICIAN_REVIEWED.getStatus())));

        String patientName = searchOrFilterParameters.getFirst("patient-name");
        if (Objects.nonNull(patientName) && !patientName.isBlank()) {
            log.info("Adding filter by patient name predicate for value '{}'", patientName);
            booleanBuilder.and(intakeForm.patientFirstName.containsIgnoreCase(patientName)
                    .or(intakeForm.patientLastName.containsIgnoreCase(patientName)));
        }

        String intakeFormFomDateValue = searchOrFilterParameters.getFirst("intake-form-from-date");
        if (Objects.nonNull(intakeFormFomDateValue) && !intakeFormFomDateValue.isBlank()) {

            try {
                Instant intakeFormFromDate = Instant.parse(intakeFormFomDateValue).truncatedTo(ChronoUnit.DAYS);
                booleanBuilder.and(intakeForm.createdOn.after(intakeFormFromDate));
            } catch (DateTimeException e) {
                log.error("Error processing intakeForm from date: {}", intakeFormFomDateValue);
                throw new IllegalArgumentException(e.getMessage());
            }

        }

        String intakeFormToDateValue = searchOrFilterParameters.getFirst("intake-form-to-date");
        if (Objects.nonNull(intakeFormToDateValue) && !intakeFormToDateValue.isBlank()) {
            try {
                Instant intakeFormToDate =
                        Instant.parse(intakeFormToDateValue).plus(1, ChronoUnit.DAYS).truncatedTo(ChronoUnit.DAYS);
                booleanBuilder.and(intakeForm.createdOn.before(intakeFormToDate));
            } catch (DateTimeException e) {
                log.error("Error processing intakeForm to date: {}", intakeFormToDateValue);
                throw new IllegalArgumentException(e.getMessage());
            }

        }

        log.info("Leaving buildSearchOrFilterPredicate()");
        return booleanBuilder;
    }

    /**
     * Retrieves information for the Physician Review Form based on the given intake
     * form ID.
     * @param  intakeFormId The ID of the intake form.
     * @return              ProcessTaskData containing the information for the
     *                      Physician Review Form.
     */
    public ProcessTaskData retrieveInfoForPhysicianReviewForm(long intakeFormId) {
        log.info("Entering retrieveInfoForPhysicianReviewForm(). intakeFormId = {}", intakeFormId);
        IntakeForm intakeForm = retrieveIntakeForm(intakeFormId);
        String taskDefinitionId = getTaskDefinitionId();
        ProcessTaskData processTask = dynamoHealthShowcaseProcessService
                .retrieveProcessTaskData(intakeForm.getProcessInstanceKey(), taskDefinitionId);
        log.info("Leaving retrieveInfoForPhysicianReviewForm()");
        return processTask;
    }

    /**
     * Completes the Physician Review Form for the given intake form ID and task
     * form.
     * @param intakeFormId The identifier of the intake form.
     * @param taskForm     The TaskForm containing the data for completing the form.
     */
    @Transactional
    public void completePhysicianReviewForm(long intakeFormId, TaskForm taskForm) {
        log.info("Entering completePhysicianReviewForm(). intakeFormId  = {}", intakeFormId);
        IntakeForm intakeForm = retrieveIntakeForm(intakeFormId);
        dynamoHealthShowcaseProcessService.completeProcessTask(taskForm);
        intakeForm.setStatus(PHYSICIAN_REVIEWED.getStatus());
        intakeFormService.update(intakeForm);
        log.info("Leaving completePhysicianReviewForm()");
    }

    /**
     * Retrieves an intake form based on the provided identifier.
     * @param  intakeFormId    The unique identifier for the intake form.
     * @return                 The retrieved intake form.
     * @throws DynamoException if the intake form is not found or the ID is invalid.
     */
    private IntakeForm retrieveIntakeForm(long intakeFormId) {
        log.info("Entering retrieveIntakeForm()");
        if (intakeFormId <= 0) {
            throw new DynamoException("Invalid intake form id.", HttpStatus.BAD_REQUEST);
        }

        IntakeForm intakeForm = intakeFormService.retrieveById(intakeFormId)
                .orElseThrow(() -> new DynamoException("Intake form not found.", HttpStatus.NOT_FOUND));
        log.info("Leaving retrieveIntakeForm()");
        return intakeForm;
    }

    /**
     * Retrieves the task definition ID based on a given value by searching through
     * the list of process tasks.
     * @return                          The task definition ID corresponding to the
     *                                  provided value.
     * @throws DynamoException          if the task definition ID is not found in
     *                                  the list of process tasks.
     * @throws IllegalArgumentException if the provided value is null or empty.
     */
    private String getTaskDefinitionId() {
        log.info("Entering getTaskDefinitionId()");
        List<String> processTasks = dynamoHealthShowcaseProcessService.getProcessTaskDefinitionIds();
        String taskDefinitionId = processTasks.stream()
                .filter(taskDefinition -> taskDefinition.equalsIgnoreCase(TASK_DEFINITION_PROVIDER_REVIEW_KEY))
                .findFirst()
                .orElseThrow(() -> new DynamoException("Task definition id not found.", HttpStatus.NOT_FOUND));
        log.info("Leaving getTaskDefinitionId()");
        return taskDefinitionId;
    }

    /**
     * Retrieves and returns patient details from the given intake form.
     * @param  intakeFormId The identifier of the intake form.
     * @return              A map containing entity names as keys and corresponding
     *                      entity properties as values.
     */
    @Transactional
    public Map<String, JsonNode> viewPatientDetails(long intakeFormId) {
        log.info("Entering viewPatientDetails(). intakeFormId  = {}", intakeFormId);
        IntakeForm intakeForm = retrieveIntakeForm(intakeFormId);
        List<ProcessDomainEntity> processDomainEntityList =
                dynamoHealthShowcaseProcessService.retrieveProcessDomainEntities(intakeForm.getProcessInstanceKey());
        Map<String, JsonNode> viewPatientMap = new TreeMap<>();
        processDomainEntityList.forEach(processDomainEntity -> viewPatientMap.put(processDomainEntity.getEntityName(),
                processDomainEntity.getEntityProperties()));
        log.info("Leaving viewPatientDetails()");
        return viewPatientMap;
    }
}
