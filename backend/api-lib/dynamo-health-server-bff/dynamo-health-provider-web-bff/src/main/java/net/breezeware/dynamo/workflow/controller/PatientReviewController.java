package net.breezeware.dynamo.workflow.controller;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.MediaType;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;

import net.breezeware.dynamo.workflow.service.PatientReviewService;
import net.breezeware.dynamo.workflow.entity.IntakeForm;
import net.breezeware.dynamo.utils.exception.DynamoException;
import net.breezeware.dynamo.utils.exception.ErrorResponse;
import net.breezeware.dynamo.workflow.dto.ProcessTaskData;
import net.breezeware.dynamo.workflow.dto.TaskForm;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.enums.ParameterStyle;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Slf4j
@RequiredArgsConstructor
@RestController
@Tag(name = "Provider Patient Management")
@RequestMapping(value = "/api/provider/patient-review")
public class PatientReviewController {

    private final PatientReviewService patientReviewService;

    @Operation(summary = "Retrieves page of patient intake forms",
            description = "Retrieves page of patient intake forms")
    @Parameters(value = {
        @Parameter(allowEmptyValue = true, name = "page-no", example = "0", description = "Page number",
                in = ParameterIn.QUERY),
        @Parameter(allowEmptyValue = true, name = "page-size", example = "8", description = "Page size",
                in = ParameterIn.QUERY),
        @Parameter(allowEmptyValue = true, name = "sort", example = "id,ASC",
                description = "Sort by field with sort order", in = ParameterIn.QUERY),
        @Parameter(allowEmptyValue = true, name = "patient-name", example = "john",
                description = "Filter by patient-name", in = ParameterIn.QUERY),
        @Parameter(allowEmptyValue = true, name = "intake-form-from-date", example = "2023-10-26T06:30:41.916184Z",
                description = "Filter by intake-form-from-date", in = ParameterIn.QUERY),
        @Parameter(allowEmptyValue = true, name = "intake-form-to-date", example = "2023-10-27T06:30:41.916184Z",
                description = "Filter by intake-form-to-date", in = ParameterIn.QUERY), })
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success",
                content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                        schema = @Schema(implementation = Page.class, example = """
                                {
                                    "content": [
                                        {
                                            "id": 1000,
                                            "createdOn": "2023-11-30T09:20:14.359983Z",
                                            "modifiedOn": "2023-11-30T09:20:29.340670Z",
                                            "processInstanceKey": "72a93713-e474-48ba-85b6-0f9f5d6d466f",
                                            "patientFirstName": "John",
                                            "patientLastName": "Doe",
                                            "status": "review_pending"
                                        }
                                    ],
                                    "pageable": {
                                        "sort": {
                                            "empty": false,
                                            "sorted": true,
                                            "unsorted": false
                                        },
                                        "offset": 0,
                                        "pageNumber": 0,
                                        "pageSize": 12,
                                        "paged": true,
                                        "unpaged": false
                                    },
                                    "last": true,
                                    "totalElements": 1,
                                    "totalPages": 1,
                                    "size": 12,
                                    "number": 0,
                                    "sort": {
                                        "empty": false,
                                        "sorted": true,
                                        "unsorted": false
                                    },
                                    "first": true,
                                    "numberOfElements": 1,
                                    "empty": false
                                }
                                """))),
        @ApiResponse(responseCode = "400", description = "Bad request",
                content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                        schema = @Schema(implementation = ErrorResponse.class, example = """
                                {
                                    "statusCode": 400,
                                    "message": "BAD_REQUEST",
                                    "details": [
                                        "Unknown parameter(s) [first-name, last-name] found"
                                    ]
                                }
                                """))),
        @ApiResponse(responseCode = "400", description = "Bad request",
                content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                        schema = @Schema(implementation = ErrorResponse.class, example = """
                                {
                                     "statusCode": 400,
                                     "message": "BAD_REQUEST",
                                     "details": [
                                         "Invalid sort criteria 'intake-form-id'. Should be something like
                                         'id,ASC' or 'id,asc'"
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
    @GetMapping("intake-forms")
    public Page<IntakeForm> retrievePatientIntakeForms(
            @Parameter(hidden = true, in = ParameterIn.QUERY, style = ParameterStyle.FORM)
            @SortDefault(sort = "status", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(required = false) MultiValueMap<String, String> searchParameters) throws DynamoException {
        log.info("Entering retrievePatientIntakeForms(), pageable: {}, searchParameters: {}", pageable,
                searchParameters);
        Page<IntakeForm> intakeFormPage = patientReviewService.retrievePatientIntakeForms(searchParameters, pageable);
        log.info("Leaving retrievePatientIntakeForms(), # of elements: {} in page-no: {}",
                intakeFormPage.getNumberOfElements(), intakeFormPage.getPageable().getPageNumber());
        return intakeFormPage;
    }

    @GetMapping()
    @Operation(summary = "Retrieve schedule information form details.",
            description = "Retrieve schedule information form details for the given identifier.")
    @Parameter(required = true, name = "intake-form-id", example = "1000",
            description = "Represents intake form identifier", in = ParameterIn.QUERY)
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
    public ProcessTaskData retrieveInfoForPhysicianReviewForm(@RequestParam("intake-form-id") long intakeFormId) {
        log.info("Entering retrieveInfoForSchedulePatientFollowup()");
        ProcessTaskData processTaskData = patientReviewService.retrieveInfoForPhysicianReviewForm(intakeFormId);
        log.info("Leaving retrieveInfoForPhysicianReviewForm()");
        return processTaskData;
    }

    @PostMapping()
    @Operation(summary = "Complete schedule information form details.",
            description = "Complete schedule information form details for the provided intake form identifier.")
    @Parameter(allowEmptyValue = false, required = true, name = "intake-form-id", example = "1000",
            description = "Represents intake form identifier", in = ParameterIn.QUERY)
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
    public void completePhysicianReviewForm(@RequestParam("intake-form-id") long intakeFormId,
            @RequestBody TaskForm taskForm) {
        log.info("Entering completePhysicianReviewForm() Intake FormId {}", intakeFormId);
        patientReviewService.completePhysicianReviewForm(intakeFormId, taskForm);
        log.info("Leaving completePhysicianReviewForm()");
    }

    @GetMapping("/patient-details")
    @Operation(summary = "View Patient details.",
            description = "View Patient details for the provided intake form identifier.")
    @Parameter(allowEmptyValue = false, required = true, name = "intake-form-id", example = "1000",
            description = "Represents intake form identifier", in = ParameterIn.QUERY)
    @ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Success Response", content = @Content(
            mediaType = MediaType.APPLICATION_JSON_VALUE,
            schema = @Schema(implementation = ErrorResponse.class, example = """
                    {
                        "scheduleAppoinment": {
                            "Schedule Appointment": [
                                {
                                    "key": "date",
                                    "display_name": "Date",
                                    "value": "2023-12-02"
                                },
                                {
                                    "key": "time",
                                    "display_name": "Time",
                                    "value": "11:00 AM"
                                },
                                {
                                    "key": "notes",
                                    "display_name": "Notes",
                                    "value": "notes"
                                }
                            ]
                        },
                        "intakeForm": {
                            "General Information": [
                                {
                                    "key": "firstName",
                                    "display_name": "First Name",
                                    "value": "Alen"
                                },
                                {
                                    "key": "lastName",
                                    "display_name": "Last Name",
                                    "value": "Kuppusamy"
                                },
                                {
                                    "key": "gender",
                                    "display_name": "Gender",
                                    "value": "male"
                                },
                                {
                                    "key": "dateOfBirth",
                                    "display_name": "Date of Birth",
                                    "value": "2023-12-01"
                                },
                                {
                                    "key": "language",
                                    "display_name": "Language",
                                    "value": "english"
                                }
                            ],
                            "Contact Information": [
                                {
                                    "key": "email",
                                    "display_name": "Email",
                                    "value": "ilawson+dev01@canojatech.com"
                                },
                                {
                                    "key": "phoneNo",
                                    "display_name": "Phone no",
                                    "value": "9578199005"
                                },
                                {
                                    "key": "addressLine1",
                                    "display_name": "Address Line 1",
                                    "value": "Addreess line 1"
                                },
                                {
                                    "key": "city",
                                    "display_name": "City",
                                    "value": "City"
                                },
                                {
                                    "key": "state",
                                    "display_name": "State",
                                    "value": "State"
                                },
                                {
                                    "key": "zipcode",
                                    "display_name": "Zipcode",
                                    "value": "11111"
                                }
                            ],
                            "Emergency Contact": [
                                {
                                    "key": "name",
                                    "display_name": "Name",
                                    "value": "Limited"
                                },
                                {
                                    "key": "relationship",
                                    "display_name": "Relationship",
                                    "value": "Friend"
                                },
                                {
                                    "key": "phoneNo1",
                                    "display_name": "Phone No",
                                    "value": "1236547895"
                                }
                            ],
                            "Insurance Information": [
                                {
                                    "key": "groupNumber",
                                    "display_name": "Group Number",
                                    "value": "123"
                                },
                                {
                                    "key": "PolicyNumber",
                                    "display_name": "Policy Number",
                                    "value": "456"
                                },
                                {
                                    "key": "InsuranceProvider",
                                    "display_name": "Insurance Provider",
                                    "value": "789"
                                }
                            ],
                            "Smoking History": [
                                {
                                    "key": "smokingHistory",
                                    "display_name": "Smoking History",
                                    "value": "never_smoked"
                                },
                                {
                                    "key": "alcoholUse",
                                    "display_name": "Alcohol Use",
                                    "value": "Never Drinked"
                                }
                            ],
                            "Purpose of Visit": [
                                {
                                    "key": "smymptoms",
                                    "display_name": "Symptoms",
                                    "value": "symptoms"
                                },
                                {
                                    "key": "symptomsExperience",
                                    "display_name": "How often do you experience your symptoms?",
                                    "value": "Occasionally"
                                },
                                {
                                    "key": "symptomsChangingOverTime",
                                    "display_name": "How are your symptoms changing over time?",
                                    "value": "staying_the_same"
                                },
                                {
                                    "key": "ratePain",
                                    "display_name": "On a scale of 1-10, how do you rate the pain?",
                                    "value": "5"
                                },
                                {
                                    "key": "painInDays",
                                    "display_name": "How long have you had this pain? (days)",
                                    "value": "10"
                                }
                            ]
                        },
                        "patientReview": {
                            "Review of Systems": [
                                {
                                    "key": "constitutional",
                                    "display_name": "Constitutional",
                                    "value": "Constitutional"
                                },
                                {
                                    "key": "eyes",
                                    "display_name": "Eyes",
                                    "value": "eyes"
                                },
                                {
                                    "key": "ent",
                                    "display_name": "ENT",
                                    "value": "ent"
                                },
                                {
                                    "key": "skinOrBreast",
                                    "display_name": "Skin/Breast",
                                    "value": "skin"
                                },
                                {
                                    "key": "cardiovascular",
                                    "display_name": "Cardiovascular",
                                    "value": "card"
                                },
                                {
                                    "key": "pulmonary",
                                    "display_name": "Pulmonary",
                                    "value": "pul"
                                },
                                {
                                    "key": "endocrine",
                                    "display_name": "Endocrine",
                                    "value": "end"
                                },
                                {
                                    "key": "gastrointestinal",
                                    "display_name": "Gastro Intestinal",
                                    "value": "gas"
                                },
                                {
                                    "key": "genitoUrinary",
                                    "display_name": "Genito Urinary",
                                    "value": "gen"
                                },
                                {
                                    "key": "musculoSkeletal",
                                    "display_name": "Musculo Skeletal",
                                    "value": "mus"
                                },
                                {
                                    "key": "neurologic",
                                    "display_name": "Neurologic",
                                    "value": "neu"
                                },
                                {
                                    "key": "notes",
                                    "display_name": "Notes",
                                    "value": "notes"
                                },
                                {
                                    "key": "physicianVisitRequired",
                                    "display_name": "Physician Visit Required",
                                    "value": "yes"
                                }
                            ]
                        },
                        "patientVitals": {
                            "Vitals": [
                                {
                                    "key": "systolicBloodPressure",
                                    "display_name": "Systolic Blood Pressure (mmHg)",
                                    "value": "180"
                                },
                                {
                                    "key": "diastolicBloodPressure",
                                    "display_name": "Diastolic Blood Pressure (mmHg)",
                                    "value": "180"
                                },
                                {
                                    "key": "heartRate",
                                    "display_name": "Heart Rate (BPM)",
                                    "value": "80"
                                },
                                {
                                    "key": "height",
                                    "display_name": "Height (cms) ",
                                    "value": "163"
                                },
                                {
                                    "key": "weight",
                                    "display_name": "Weight (lbs) ",
                                    "value": "85"
                                },
                                {
                                    "key": "notes",
                                    "display_name": "Notes",
                                    "value": "notes"
                                }
                            ]
                        }
                    }                                \
                    """))),
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
    public Map<String, JsonNode> viewPatientDetails(@RequestParam("intake-form-id") long intakeFormId) {
        log.info("Entering viewPatientDetails()");
        Map<String, JsonNode> patientDetails = patientReviewService.viewPatientDetails(intakeFormId);
        log.info("Leaving viewPatientDetails()");
        return patientDetails;
    }

}
