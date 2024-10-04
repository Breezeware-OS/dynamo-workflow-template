package net.breezeware.dynamo.workflow.taskmanager;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import net.breezeware.dynamo.utils.exception.DynamoException;
import net.breezeware.dynamo.workflow.dto.ProcessTaskData;
import net.breezeware.dynamo.workflow.dto.TaskForm;
import net.breezeware.dynamo.workflow.entity.ProcessDomainEntity;
import net.breezeware.dynamo.workflow.service.CamundaProcessManager;
import net.breezeware.dynamo.workflow.service.EntityGenerator;
import net.breezeware.dynamo.workflow.service.ProcessDomainEntityService;
import net.breezeware.dynamo.workflow.taskmanager.TaskManager;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service(value = "DynamoHealthShowcaseApp-review-patient-intake-form")
@RequiredArgsConstructor
public class ReviewPatientIntakeFormTaskManager implements TaskManager {
    private final CamundaProcessManager camundaProcessManager;
    private final ProcessDomainEntityService processDomainEntityService;
    private final EntityGenerator entityGenerator;

    public ProcessTaskData getInfoToActOnTask(String processId, String processInstanceUserDefinedKey,
            String taskDefinitionId) {
        log.info("Entering getInfoToActOnTask() #ReviewPatientIntakeFormTaskManager");
        // Retrieve domain entities that are prerequisites to act on this task
        Map<String, ProcessDomainEntity> contextData =
                processDomainEntityService.retrieveProcessDomainEntities(processInstanceUserDefinedKey).stream()
                        .collect(Collectors.toMap(ProcessDomainEntity::getEntityName, entity -> entity));

        // Retrieve task form to submit task info
        TaskForm taskForm =
                camundaProcessManager.retrieveTaskForm(processId, processInstanceUserDefinedKey, taskDefinitionId)
                        .orElseThrow(() -> new DynamoException("Task Form Not Found.", HttpStatus.NOT_FOUND));

        // build return data
        ProcessTaskData processTaskDataDto =
                ProcessTaskData.builder().contextData(contextData).taskForm(taskForm).build();
        log.info("Leaving getInfoToActOnTask() #ReviewPatientIntakeFormTaskManager");
        return processTaskDataDto;
    }

    public void completeTask(TaskForm taskForm) {
        log.info("Entering completeTask() #ReviewPatientIntakeFormTaskManager");
        // create/update entities based on info from TaskForm
        entityGenerator.generateAndPersistEntities(taskForm);
        // call workflow engine to complete this task
        camundaProcessManager.completeUserTask(taskForm);
        log.info("Leaving completeTask() #ReviewPatientIntakeFormTaskManager");
    }
}