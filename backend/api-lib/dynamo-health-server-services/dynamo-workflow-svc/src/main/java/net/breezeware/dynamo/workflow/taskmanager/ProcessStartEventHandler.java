package net.breezeware.dynamo.workflow.taskmanager;

import java.util.UUID;

import org.springframework.stereotype.Service;

import net.breezeware.dynamo.workflow.service.CamundaProcessManager;
import net.breezeware.dynamo.workflow.taskmanager.StartProcessEventHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProcessStartEventHandler implements StartProcessEventHandler {

    private final CamundaProcessManager camundaProcessManager;

    @Override
    public String initiateNewProcessInstance(String processId) {
        log.info("Entering initiateNewProcessInstance()");
        String processInstanceUserDefinedKey = UUID.randomUUID().toString();
        camundaProcessManager.createNewProcessInstance(processId, processInstanceUserDefinedKey);
        log.info("Leaving initiateNewProcessInstance()");
        return processInstanceUserDefinedKey;
    }
}