package net.breezeware.dynamo.workflow.service;

import java.time.DateTimeException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
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
public class PatientManagementService {

    public static final String TASK_DEFINITION_PATIENT_REVIEW_KEY = "review-patient-intake-form";
    public static final String TASK_DEFINITION_TAKE_VITALS_KEY = "take-patient-vitals";
    public static final String TASK_DEFINITION_SCHEDULE_PATIENT_FOLLOWUP_KEY = "schedule-patient-followup";
    public static final String PATIENT_REVIEW_ENTITY_NAME = "patientReview";
    public static final String PHYSICIAN_NOTES_ENTITY_NAME = "physicianNotes";
    private static final Set<String> DEFAULT_VALID_PARAMETERS = Set.of("page-no", "page-size", "sort");
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
        Map<String, IntakeFormStatus> statusMapping = getStringIntakeFormStatusMap();

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

    private Map<String, IntakeFormStatus> getStringIntakeFormStatusMap() {
        Map<String, IntakeFormStatus> statusMapping = new HashMap<>();
        statusMapping.put(IntakeFormStatus.FORM_SUBMITTED.getStatus(), IntakeFormStatus.REVIEW_INTAKE_FORM);
        statusMapping.put(IntakeFormStatus.PHYSICIAN_REVIEW_NEEDED.getStatus(), IntakeFormStatus.COMPLETED);
        statusMapping.put(IntakeFormStatus.PHYSICIAN_REVIEWED.getStatus(), IntakeFormStatus.TAKE_VITALS);
        statusMapping.put(IntakeFormStatus.VITALS_OBTAINED.getStatus(), IntakeFormStatus.SCHEDULE_FOLLOWUP);
        statusMapping.put(IntakeFormStatus.FOLLOWUP_SCHEDULED.getStatus(), IntakeFormStatus.COMPLETED);
        return statusMapping;
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
        String patientName = searchOrFilterParameters.getFirst("patient-name");
        booleanBuilder.and(intakeForm.status.notEqualsIgnoreCase(IntakeFormStatus.FORM_IN_PROGRESS.getStatus()));

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
     * Retrieves information for reviewing the patient intake form based on the
     * given intake form identifier.
     * @param  intakeFormId The identifier of the intake form to be reviewed.
     * @return              ProcessTaskData containing the information for reviewing
     *                      the patient intake form.
     */
    public ProcessTaskData retrieveInfoForReviewIntakeForm(long intakeFormId) {
        log.info("Entering retrieveInfoForReviewIntakeForm(). intakeFormId = {}", intakeFormId);
        IntakeForm intakeForm = retrieveIntakeForm(intakeFormId);
        String taskDefinitionId = getTaskDefinitionId(TASK_DEFINITION_PATIENT_REVIEW_KEY);
        ProcessTaskData processTask = dynamoHealthShowcaseProcessService
                .retrieveProcessTaskData(intakeForm.getProcessInstanceKey(), taskDefinitionId);
        log.info("Leaving retrieveInfoForReviewIntakeForm()");
        return processTask;
    }

    /**
     * Completes the review process for the patient intake form with the given
     * intake form identifier and task form.
     * @param intakeFormId The identifier of the patient intake form to be reviewed.
     * @param taskForm     The TaskForm containing the data for completing the
     *                     review process.
     */
    @Transactional
    public void completeReviewIntakeForm(long intakeFormId, TaskForm taskForm) {
        log.info("Entering completeReviewIntakeForm(). intakeFormId  = {}", intakeFormId);
        IntakeForm intakeForm = retrieveIntakeForm(intakeFormId);
        dynamoHealthShowcaseProcessService.completeProcessTask(taskForm);
        parseAndUpdateIntakeForm(intakeForm);
        log.info("Leaving completeReviewIntakeForm()");
    }

    /**
     * Parses and saves patient details in the intake form.
     * @param  intakeForm      The intake form to be updated with patient details.
     * @throws DynamoException if there is an issue parsing or saving the patient
     *                         details.
     */
    private void parseAndUpdateIntakeForm(IntakeForm intakeForm) {
        log.info("Entering parseAndUpdateIntakeForm()");
        Optional<ProcessDomainEntity> optionalProcessDomainEntity = dynamoHealthShowcaseProcessService
                .retrieveProcessDomainEntity(intakeForm.getProcessInstanceKey(), PATIENT_REVIEW_ENTITY_NAME);

        if (optionalProcessDomainEntity.isPresent()) {
            ProcessDomainEntity processDomainEntity = optionalProcessDomainEntity.get();
            String sectionName = "Review of Systems";
            String searchField = "physicianVisitRequired";
            String physicianVisitRequiredValue =
                    getFieldValueInSection(processDomainEntity.getEntityProperties(), sectionName, searchField);
            if (physicianVisitRequiredValue != null && physicianVisitRequiredValue.equalsIgnoreCase("yes")) {
                intakeForm.setStatus(IntakeFormStatus.PHYSICIAN_REVIEW_NEEDED.getStatus());
            } else {
                intakeForm.setStatus(IntakeFormStatus.TAKE_VITALS.getStatus());
            }

        }

        IntakeForm updatedIntakeForm = intakeFormService.update(intakeForm);
        log.info("Leaving parseAndUpdateIntakeForm() savedIntakeForm = {}", updatedIntakeForm);
        System.out.println(updatedIntakeForm);

    }

    /**
     * Retrieves information for taking patient vitals based on the given intake
     * form identifier.
     * @param  intakeFormId The identifier of the intake form for which patient
     *                      vitals are to be taken.
     * @return              ProcessTaskData containing the information for taking
     *                      patient vitals.
     */
    public ProcessTaskData retrieveInfoForTakePatientVitals(long intakeFormId) {
        log.info("Entering retrieveInfoForTakePatientVitals(). intakeFormId = {}", intakeFormId);
        IntakeForm intakeForm = retrieveIntakeForm(intakeFormId);
        String taskDefinitionId = getTaskDefinitionId(TASK_DEFINITION_TAKE_VITALS_KEY);
        ProcessTaskData processTask = dynamoHealthShowcaseProcessService
                .retrieveProcessTaskData(intakeForm.getProcessInstanceKey(), taskDefinitionId);
        log.info("Leaving retrieveInfoForTakePatientVitals()");
        return processTask;
    }

    /**
     * Completes the process of taking patient vitals for the given intake form
     * identifier and task form.
     * @param intakeFormId The identifier of the intake form for which patient
     *                     vitals are taken.
     * @param taskForm     The TaskForm containing the data for completing the
     *                     patient vitals process.
     */
    @Transactional
    public void completeTakePatientVitalsForm(long intakeFormId, TaskForm taskForm) {
        log.info("Entering completeTakePatientVitalsForm(). intakeFormId  = {}", intakeFormId);
        IntakeForm intakeForm = retrieveIntakeForm(intakeFormId);
        dynamoHealthShowcaseProcessService.completeProcessTask(taskForm);
        updateIntakeFormStatus(intakeForm, IntakeFormStatus.VITALS_OBTAINED);
        log.info("Leaving completeTakePatientVitalsForm()");
    }

    /**
     * Retrieves information for scheduling a follow-up for a patient based on the
     * given intake form identifier.
     * @param  intakeFormId The identifier of the intake form for which the patient
     *                      follow-up is to be scheduled.
     * @return              ProcessTaskData containing the information for
     *                      scheduling the patient follow-up.
     */
    public ProcessTaskData retrieveInfoForSchedulePatientFollowup(long intakeFormId) {
        log.info("Entering retrieveInfoForSchedulePatientFollowup(). intakeFormId = {}", intakeFormId);
        IntakeForm intakeForm = retrieveIntakeForm(intakeFormId);
        String taskDefinitionId = getTaskDefinitionId(TASK_DEFINITION_SCHEDULE_PATIENT_FOLLOWUP_KEY);
        ProcessTaskData processTask = dynamoHealthShowcaseProcessService
                .retrieveProcessTaskData(intakeForm.getProcessInstanceKey(), taskDefinitionId);
        log.info("Leaving retrieveInfoForSchedulePatientFollowup()");
        return processTask;
    }

    /**
     * Completes the process of scheduling a follow-up for the patient with the
     * given intake form identifier and task form.
     * @param intakeFormId The identifier of the intake form for which the patient
     *                     follow-up is scheduled.
     * @param taskForm     The TaskForm containing the data for completing the
     *                     patient follow-up scheduling process.
     */
    @Transactional
    public void completeTakeSchedulePatientFollowup(long intakeFormId, TaskForm taskForm) {
        log.info("Entering retrieveInfoForSchedulePatientFollowup(). intakeFormId  = {}", intakeFormId);
        IntakeForm intakeForm = retrieveIntakeForm(intakeFormId);
        dynamoHealthShowcaseProcessService.completeProcessTask(taskForm);
        updateIntakeFormStatus(intakeForm, IntakeFormStatus.FOLLOWUP_SCHEDULED);
        log.info("Leaving retrieveInfoForSchedulePatientFollowup()");
    }

    /**
     * Retrieves an intake form based on the provided identifier.
     * @param  intakeFormId    The unique identifier for the intake form.
     * @return                 The retrieved intake form.
     * @throws DynamoException if the intake form is not found or the identifier is
     *                         invalid.
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
     * Retrieves the task definition identifier based on a given value by searching
     * through the list of process tasks.
     * @param  value                    The value to match and retrieve the
     *                                  associated task definition identifier.
     * @return                          The task definition identifier corresponding
     *                                  to the provided value.
     * @throws DynamoException          if the task definition identifier is not
     *                                  found in the list of process tasks.
     * @throws IllegalArgumentException if the provided value is null or empty.
     */
    private String getTaskDefinitionId(String value) {
        log.info("Entering getTaskDefinitionId()");
        if (value == null || value.isEmpty()) {
            throw new DynamoException("Value cannot be null or empty", HttpStatus.BAD_REQUEST);
        }

        List<String> processTasks = dynamoHealthShowcaseProcessService.getProcessTaskDefinitionIds();
        String taskDefinitionId =
                processTasks.stream().filter(taskDefinition -> taskDefinition.equalsIgnoreCase(value)).findFirst()
                        .orElseThrow(() -> new DynamoException("Task definition id not found.", HttpStatus.NOT_FOUND));
        log.info("Leaving getTaskDefinitionId()");
        return taskDefinitionId;
    }

    /**
     * Updates the status of the provided intake form based on the given status.
     * @param  intakeForm      The intake form to update.
     * @param  status          The new status to set for the intake form.
     * @throws DynamoException if there is an issue updating the intake form status.
     */
    private void updateIntakeFormStatus(IntakeForm intakeForm, IntakeFormStatus status) {
        log.info("Entering updateIntakeFormStatus()");
        try {
            intakeForm.setStatus(status.getStatus());
            IntakeForm updatedIntakeForm = intakeFormService.update(intakeForm);
            log.info("Leaving updateIntakeFormStatus() Updated IntakeForm = {}", updatedIntakeForm);
        } catch (Exception e) {
            throw new DynamoException("Error updating intake form status", HttpStatus.BAD_REQUEST);
        }

    }

    /**
     * Retrieves the value of a specified field within a given section of the entity
     * properties.
     * @param  sectionName The name of the section containing the field.
     * @param  searchField The key of the field to search within the specified
     *                     section.
     * @return             The value of the specified field within the given
     *                     section, or null if not found.
     */
    private String getFieldValueInSection(JsonNode entityProperties, String sectionName, String searchField) {
        log.info("Entering getFieldValueInSection()");
        JsonNode sectionArrayNode = entityProperties.get(sectionName);

        if (sectionArrayNode != null) {
            for (JsonNode fieldNode : sectionArrayNode) {
                if (fieldNode.get("key").asText().equals(searchField)) {
                    JsonNode valueNode = fieldNode.get("value");
                    log.info("Leaving getFieldValueInSection()");
                    return (valueNode != null) ? valueNode.asText() : null;
                }

            }

        }

        return null;
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
        viewPatientMap.remove(PHYSICIAN_NOTES_ENTITY_NAME);
        log.info("Leaving viewPatientDetails()");
        return viewPatientMap;
    }

}
