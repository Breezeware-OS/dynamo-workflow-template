package net.breezeware.dynamo.workflow.enumeration;

import lombok.Getter;

/**
 * Enum representing different statuses for an intake form.
 */
@Getter
public enum IntakeFormStatus {

    REVIEW_INTAKE_FORM("review_intake_form"), INTAKE_FORM_REVIEWED("intake_form_reviewed"),
    PHYSICIAN_REVIEW_NEEDED("physician_review_needed"), PHYSICIAN_REVIEWED("physician_reviewed"),
    TAKE_VITALS("take_vitals"), VITALS_OBTAINED("vitals_obtained"), SCHEDULE_FOLLOWUP("schedule_followup"),
    FOLLOWUP_SCHEDULED("followup_scheduled"), COMPLETED("completed"), REVIEW_PENDING("review_pending"),
    FORM_SUBMITTED("form_submitted"), FORM_IN_PROGRESS("form_in-progress");

    private final String status;

    IntakeFormStatus(String status) {
        this.status = status;
    }

}