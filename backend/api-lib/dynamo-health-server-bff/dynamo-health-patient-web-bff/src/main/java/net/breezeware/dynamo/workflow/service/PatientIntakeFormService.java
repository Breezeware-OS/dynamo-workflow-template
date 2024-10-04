package net.breezeware.dynamo.workflow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;

import net.breezeware.dynamo.utils.exception.DynamoException;
import net.breezeware.dynamo.workflow.dto.ProcessTaskData;
import net.breezeware.dynamo.workflow.dto.TaskForm;
import net.breezeware.dynamo.workflow.entity.IntakeForm;
import net.breezeware.dynamo.workflow.entity.ProcessDomainEntity;
import net.breezeware.dynamo.workflow.enumeration.IntakeFormStatus;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class PatientIntakeFormService {

    public static final String TASK_DEFINITION_SUBMIT_PATIENT_INTAKE_FORM_KEY = "submit-patient-intake-form";
    public static final String INTAKE_FORM_ENTITY_NAME = "intakeForm";
    private final IntakeFormService intakeFormService;

    private final DynamoHealthShowcaseProcessService dynamoHealthShowcaseProcessService;

    /**
     * Starts the new intake form and returns the newly started intake form.
     * @return started intake form object.
     */
    @Transactional
    public IntakeForm startNewIntakeForm() {
        log.info("Entering startNewIntakeForm()");
        String processInstanceUserDefinedKey = dynamoHealthShowcaseProcessService.startProcess();
        // create a new process instance
        IntakeForm intakeForm = new IntakeForm();
        intakeForm.setStatus(IntakeFormStatus.FORM_IN_PROGRESS.getStatus());
        intakeForm.setProcessInstanceKey(processInstanceUserDefinedKey);
        IntakeForm savedIntakeForm = intakeFormService.create(intakeForm);
        log.info("Leaving startNewIntakeForm()");
        return savedIntakeForm;
    }

    /**
     * Retrieves process task data related to submitting a patient intake form.
     * @param  intakeFormId    The unique identifier for the intake form.
     * @return                 The process task data for submitting the patient
     *                         intake form.
     * @throws DynamoException if the associated intake form or task definition ID
     *                         is not found.
     */
    public ProcessTaskData retrieveInfoForSubmitIntakeForm(long intakeFormId) {
        log.info("Entering retrieveInfoForSubmitIntakeForm(). intakeFromId = {}", intakeFormId);
        IntakeForm intakeForm = retrieveIntakeForm(intakeFormId);
        String taskDefinitionId = getTaskDefinitionId();
        ProcessTaskData processTask = dynamoHealthShowcaseProcessService
                .retrieveProcessTaskData(intakeForm.getProcessInstanceKey(), taskDefinitionId);
        log.info("Leaving retrieveInfoForSubmitIntakeForm()");
        return processTask;
    }

    /**
     * Completes the submission of a patient intake form.
     * @param intakeFormId The unique identifier for the intake form.
     * @param taskForm     The task form containing submission details.
     */
    @Transactional
    public void completeSubmitIntakeForm(long intakeFormId, TaskForm taskForm) {
        log.info("Entering completeSubmitIntakeForm(). intakeFormId  = {}", intakeFormId);
        IntakeForm intakeForm = retrieveIntakeForm(intakeFormId);
        dynamoHealthShowcaseProcessService.completeProcessTask(taskForm);
        parseAndSavePatientDetailsInIntakeForm(intakeForm);
        log.info("Leaving completeSubmitIntakeForm()");
    }

    /**
     * Parses and saves patient details in the intake form.
     * @param  intakeForm      The intake form to be updated with patient details.
     * @throws DynamoException if there is an issue parsing or saving the patient
     *                         details.
     */
    private void parseAndSavePatientDetailsInIntakeForm(IntakeForm intakeForm) {
        log.info("Entering parseAndSavePatientDetailsInIntakeForm()");
        Optional<ProcessDomainEntity> optionalProcessDomainEntity = dynamoHealthShowcaseProcessService
                .retrieveProcessDomainEntity(intakeForm.getProcessInstanceKey(), INTAKE_FORM_ENTITY_NAME);
        try {
            if (optionalProcessDomainEntity.isPresent()) {
                ProcessDomainEntity processDomainEntity = optionalProcessDomainEntity.get();
                // Get General Information Array Node
                String generalInformationSectionKey = "General Information";
                JsonNode generalInfoArrayNode =
                        processDomainEntity.getEntityProperties().get(generalInformationSectionKey);
                setIntakeFormPatientsDetails(intakeForm, generalInfoArrayNode, "firstName");
                setIntakeFormPatientsDetails(intakeForm, generalInfoArrayNode, "lastName");
                intakeForm.setStatus(IntakeFormStatus.FORM_SUBMITTED.getStatus());
                IntakeForm savedIntakeForm = intakeFormService.update(intakeForm);
                log.info("Leaving parseAndSavePatientDetailsInIntakeForm() savedIntakeForm = {}", savedIntakeForm);
                System.out.println(savedIntakeForm);
            }

        } catch (Exception e) {
            throw new DynamoException(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    /**
     * Sets patient details in the intake form based on the provided JSON node.
     * @param intakeForm The intake form to be updated with patient details.
     * @param jsonNode   The JSON node containing patient details.
     * @param fieldName  The name of the field to set in the intake form.
     */
    private void setIntakeFormPatientsDetails(IntakeForm intakeForm, JsonNode jsonNode, String fieldName) {
        log.info("Entering setField()");
        for (JsonNode fieldNode : jsonNode) {
            if (fieldNode.get("key").asText().equals(fieldName)) {
                if (fieldName.equals("firstName")) {
                    intakeForm.setPatientFirstName(fieldNode.get("value").asText());
                } else if (fieldName.equals("lastName")) {
                    intakeForm.setPatientLastName(fieldNode.get("value").asText());
                }

            }

        }

    }

    /**
     * Retrieves the task definition ID based on a given value by searching through
     * the list of process tasks.
     * @return                 The task definition ID corresponding to the provided
     *                         value.
     * @throws DynamoException if the task definition ID is not found in the list of
     *                         process tasks.
     */
    private String getTaskDefinitionId() {
        log.info("Entering getTaskDefinitionId()");
        List<String> processTasks = dynamoHealthShowcaseProcessService.getProcessTaskDefinitionIds();
        String taskDefinitionId = processTasks.stream()
                .filter(taskDefinition -> taskDefinition
                        .equalsIgnoreCase(TASK_DEFINITION_SUBMIT_PATIENT_INTAKE_FORM_KEY))
                .findFirst()
                .orElseThrow(() -> new DynamoException("Task definition id not found.", HttpStatus.NOT_FOUND));
        log.info("Leaving getTaskDefinitionId()");
        return taskDefinitionId;
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
            throw new DynamoException("Invalid intake from id.", HttpStatus.BAD_REQUEST);
        }

        IntakeForm intakeForm = intakeFormService.retrieveById(intakeFormId)
                .orElseThrow(() -> new DynamoException("Intake form not found.", HttpStatus.NOT_FOUND));
        log.info("Leaving retrieveIntakeForm()");
        return intakeForm;
    }

}
