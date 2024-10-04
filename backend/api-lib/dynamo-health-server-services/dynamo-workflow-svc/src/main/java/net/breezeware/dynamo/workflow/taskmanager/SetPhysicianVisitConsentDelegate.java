package net.breezeware.dynamo.workflow.taskmanager;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import jakarta.inject.Named;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;

import com.fasterxml.jackson.databind.JsonNode;

import net.breezeware.dynamo.workflow.entity.ProcessDomainEntity;
import net.breezeware.dynamo.workflow.service.ProcessDomainEntityService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Named("SetPhysicianVisitConsentDelegate")
@RequiredArgsConstructor
public class SetPhysicianVisitConsentDelegate implements JavaDelegate {

    private final ProcessDomainEntityService processDomainEntityService;

    @Override
    public void execute(DelegateExecution execution) {
        log.info("Entering execute() execution ");

        List<ProcessDomainEntity> processDomainEntities =
                processDomainEntityService.retrieveProcessDomainEntities(execution.getProcessBusinessKey());

        Optional<ProcessDomainEntity> optProcessDomainEntity = processDomainEntities.stream()
                .filter(processDomainEntity -> processDomainEntity.getEntityName().equalsIgnoreCase("patientReview"))
                .findFirst();

        optProcessDomainEntity.ifPresent(processDomainEntity -> {
            String reviewOfSystemsSectionKey = "Review of Systems";
            JsonNode reviewOfSystemArrayNode = processDomainEntity.getEntityProperties().get(reviewOfSystemsSectionKey);

            for (JsonNode fieldNode : reviewOfSystemArrayNode) {
                if (fieldNode.get("key").asText().equals("physicianVisitRequired")) {
                    String value = fieldNode.get("value").asText();
                    Map<String, Object> variables = new HashMap<>();
                    variables.put("physician_visit_required", value);
                    execution.setVariables(variables);
                }

            }

        });

    }
}
