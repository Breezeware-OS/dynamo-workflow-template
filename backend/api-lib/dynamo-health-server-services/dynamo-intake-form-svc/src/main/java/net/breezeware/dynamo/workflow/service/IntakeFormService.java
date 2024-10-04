package net.breezeware.dynamo.workflow.service;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import net.breezeware.dynamo.workflow.dao.IntakeFormRepository;
import net.breezeware.dynamo.workflow.entity.IntakeForm;
import net.breezeware.dynamo.generics.crud.service.GenericService;
import net.breezeware.dynamo.utils.exception.DynamoException;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class IntakeFormService extends GenericService<IntakeForm> {

    private final IntakeFormRepository intakeFormRepository;

    /**
     * Constructs a new GenericService with the provided GenericRepository.
     * @param intakeFormRepository the repository for accessing and managing entity
     *                             data.
     */
    public IntakeFormService(IntakeFormRepository intakeFormRepository) {
        super(intakeFormRepository);
        this.intakeFormRepository = intakeFormRepository;
    }

    /**
     * Retrieves an intake form based on the given process instance key.
     * @param  processInstanceKey The user-defined key associated with the process
     *                            instance.
     * @return                    An optional containing the retrieved intake form,
     *                            or an empty optional if not found.
     * @throws DynamoException    if the provided processInstanceKey is null or
     *                            empty.
     */
    public Optional<IntakeForm> retrieveIntakeForm(String processInstanceKey) {
        log.info("Entering retrieveIntakeForm()");
        if (processInstanceKey == null || processInstanceKey.isEmpty()) {
            log.error("Invalid processInstanceKey: {}", processInstanceKey);
            throw new DynamoException("processInstanceKey cannot be null or empty", HttpStatus.BAD_REQUEST);
        }

        Optional<IntakeForm> optIntakeForm = intakeFormRepository.findByProcessInstanceKey(processInstanceKey);
        log.info("Leaving retrieveIntakeForm()");
        return optIntakeForm;
    }

}
