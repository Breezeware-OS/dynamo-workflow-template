package net.breezeware.dynamo.workflow.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.breezeware.dynamo.utils.exception.ErrorResponse;
import net.breezeware.dynamo.workflow.dto.ProcessTaskData;
import net.breezeware.dynamo.workflow.dto.TaskForm;
import net.breezeware.dynamo.workflow.entity.IntakeForm;
import net.breezeware.dynamo.workflow.service.PatientIntakeFormService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Slf4j
@RequiredArgsConstructor
@RestController
@Tag(name = "Patient Intake Forms")
@RequestMapping(value = "/api/patient/intake-forms")
public class PatientIntakeFormController {

    private final PatientIntakeFormService patientIntakeFormService;

    @PostMapping("/create")
    @Operation(summary = "Start new IntakeForm.", description = "Start new IntakeForm for the patient.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success Payload",
                content = @Content(mediaType = "application/json",
                        schema = @Schema(implementation = IntakeForm.class))),
        @ApiResponse(responseCode = "400", description = "Bad request",
                content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                        schema = @Schema(implementation = ErrorResponse.class, example = """
                                {
                                     "statusCode": 400,
                                     "message": "BAD_REQUEST",
                                     "details": [
                                         "Invalid IntakeForm identifier"
                                     ]
                                 }
                                """))),
        @ApiResponse(responseCode = "401", description = "Unauthorized request",
                content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                        schema = @Schema(implementation = ErrorResponse.class, example = """
                                {
                                    "statusCode": 401,
                                    "message": "UNAUTHORIZED",
                                    "details": [
                                        "Full authentication is required to access this resource"
                                    ]
                                }"""))) })
    public IntakeForm startNewIntakeForm() {
        log.info("Entering startNewIntakeForm()");
        IntakeForm intakeForm = patientIntakeFormService.startNewIntakeForm();
        log.info("Leaving startNewIntakeForm()");
        return intakeForm;
    }

    @GetMapping("/{intake-form-id}/submit-intake-form")
    @Operation(summary = "Get submit intake form details.",
            description = "Get Submit intake form details for the intake form.")
    @Parameter(allowEmptyValue = false, required = true, name = "intake-form-id", example = "1000",
            description = "Represents intake form identifier", in = ParameterIn.PATH)
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success Payload",
                content = @Content(mediaType = "application/json",
                        schema = @Schema(implementation = ProcessTaskData.class))),
        @ApiResponse(responseCode = "400", description = "Bad request",
                content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                        schema = @Schema(implementation = ErrorResponse.class, example = """
                                {
                                     "statusCode": 400,
                                     "message": "BAD_REQUEST",
                                     "details": [
                                         "Invalid intake-form-id identifier"
                                     ]
                                 }
                                """))),
        @ApiResponse(responseCode = "401", description = "Unauthorized request",
                content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                        schema = @Schema(implementation = ErrorResponse.class, example = """
                                {
                                    "statusCode": 401,
                                    "message": "UNAUTHORIZED",
                                    "details": [
                                        "Full authentication is required to access this resource"
                                    ]
                                }"""))) })
    public ProcessTaskData retrieveInfoForSubmitIntakeForm(@PathVariable("intake-form-id") long intakeFormId) {
        log.info("Entering retrieveInfoForSubmitIntakeForm()");
        ProcessTaskData processTaskData = patientIntakeFormService.retrieveInfoForSubmitIntakeForm(intakeFormId);
        log.info("Leaving retrieveInfoForSubmitIntakeForm()");
        return processTaskData;
    }

    @PostMapping("/{intake-form-id}/submit-intake-form")
    @Operation(summary = "Submit Intake form.",
            description = "Submit intake form details for the provided intake form identifier.")
    @Parameter(allowEmptyValue = false, required = true, name = "intake-form-id", example = "1000",
            description = "Represents intake form identifier", in = ParameterIn.PATH)
    @io.swagger.v3.oas.annotations.parameters.RequestBody(
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = TaskForm.class)))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Bad request",
                content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                        schema = @Schema(implementation = ErrorResponse.class, example = """
                                {
                                     "statusCode": 400,
                                     "message": "BAD_REQUEST",
                                     "details": [
                                         "Invalid Intake Form identifier"
                                     ]
                                 }
                                """))),
        @ApiResponse(responseCode = "401", description = "Unauthorized request",
                content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                        schema = @Schema(implementation = ErrorResponse.class, example = """
                                {
                                    "statusCode": 401,
                                    "message": "UNAUTHORIZED",
                                    "details": [
                                        "Full authentication is required to access this resource"
                                    ]
                                }"""))) })
    public void submitIntakeForm(@PathVariable("intake-form-id") long intakeFormId, @RequestBody TaskForm taskForm) {
        log.info("Entering submitIntakeForm() Intake FormId {}", intakeFormId);
        patientIntakeFormService.completeSubmitIntakeForm(intakeFormId, taskForm);
        log.info("Leaving submitIntakeForm()");
    }

}
