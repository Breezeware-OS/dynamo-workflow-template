package net.breezeware.dynamo.workflow.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import net.breezeware.dynamo.workflow.taskmanager.ProcessStartEventHandler;
import net.breezeware.dynamo.workflow.entity.ProcessDomainEntity;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

/**
 * Service for managing the Dynamo Showcase BPMN process.
 */
@Slf4j
@Service
public class DynamoHealthShowcaseProcessService extends ProcessService {

    /**
     * Value of the ID attribute in the bpmn:process XML tag in the process
     * definition.
     */
    public static final String PROCESS_ID = "DynamoHealthShowcaseApp";
    private final ProcessStartEventHandler processStartEventHandler;
    private final ProcessDomainEntityService processDomainEntityService;

    public DynamoHealthShowcaseProcessService(CamundaProcessManager camundaProcessManager,
            ApplicationContext applicationContext, ProcessStartEventHandler processStartEventHandler,
            ProcessDomainEntityService processDomainEntityService) {
        super(camundaProcessManager, applicationContext);
        this.processStartEventHandler = processStartEventHandler;
        this.processDomainEntityService = processDomainEntityService;
    }

    /**
     * Starts a new application process.
     * @return Unique ID to identify the application.
     */
    public String startProcess() {
        return processStartEventHandler.initiateNewProcessInstance(PROCESS_ID);
    }

    @Override
    public List<String> getProcessTaskDefinitionIds() {
        return Stream.of(TaskDefinitionId.values()).map(TaskDefinitionId::getValue).collect(Collectors.toList());
    }

    @Override
    protected String getProcessId() {
        return PROCESS_ID;
    }

    /**
     * Retrieves a specific entity created for a process instance.
     * @param  processInstanceUserDefinedKey The user-defined key of the process
     *                                       instance.
     * @param  entityName                    The name of the entity to retrieve.
     * @return                               The retrieved entity.
     */
    public Optional<ProcessDomainEntity> retrieveProcessDomainEntity(String processInstanceUserDefinedKey,
            String entityName) {
        log.info("Entering retrieveProcessDomainEntity()");
        Optional<ProcessDomainEntity> processDomainEntity =
                processDomainEntityService.retrieveProcessDomainEntity(processInstanceUserDefinedKey, entityName);
        log.info("Leaving retrieveProcessDomainEntity()");
        return processDomainEntity;
    }

    public List<ProcessDomainEntity> retrieveProcessDomainEntities(String processInstanceUserDefinedKey) {
        log.info("Entering retrieveProcessDomainEntities()");
        List<ProcessDomainEntity> processDomainEntities =
                processDomainEntityService.retrieveProcessDomainEntities(processInstanceUserDefinedKey);
        log.info("Leaving retrieveProcessDomainEntities()");
        return processDomainEntities;
    }

    /**
     * Enum representing task definition IDs for various tasks in the Application
     * Workflow process.
     */
    @Getter
    public enum TaskDefinitionId {
        SUBMIT_PATIENT_INTAKE_FORM("submit-patient-intake-form"),
        REVIEW_PATIENT_INTAKE_FORM("review-patient-intake-form"),
        PHYSICIAN_REVIEW_PATIENT_INFORMATION("physician-review-patient-information"),
        TAKE_PATIENT_VITALS("take-patient-vitals"), SCHEDULE_PATIENT_FOLLOWUP("schedule-patient-followup");

        /**
         * Retrieves the string value representing the task definition ID.
         */
        private final String value;

        /**
         * Constructs a TaskDefinitionId enum value with the given string value.
         * @param value The string value representing the task definition ID.
         */
        TaskDefinitionId(String value) {
            this.value = value;
        }

    }
}
