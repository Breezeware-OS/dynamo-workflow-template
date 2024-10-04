package net.breezeware.dynamo.workflow.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import net.breezeware.dynamo.generics.crud.entity.GenericEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "intake_form", schema = "dynamo")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class IntakeForm extends GenericEntity {

    private String processInstanceKey;
    private String patientFirstName;
    private String patientLastName;
    private String status;

}
