-- Create schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS dynamo;

-- Drop and create the intake_form sequence
DROP SEQUENCE IF EXISTS dynamo.intake_form_seq;
CREATE SEQUENCE dynamo.intake_form_seq
    START WITH 1000
    INCREMENT BY 1;

-- Drop and create the intake_form table
DROP TABLE IF EXISTS dynamo.intake_form;
CREATE TABLE dynamo.intake_form (
    id BIGINT NOT NULL DEFAULT (NEXT VALUE FOR dynamo.intake_form_seq),
    patient_first_name VARCHAR(255),
    patient_last_name VARCHAR(255),
    process_instance_key VARCHAR(255),
    status VARCHAR(255),
    created_on TIMESTAMP,
    modified_on TIMESTAMP,
    CONSTRAINT intake_form_pkey PRIMARY KEY (id)
);

-- Drop and create the process_domain_entity sequence
DROP SEQUENCE IF EXISTS dynamo.process_domain_entity_seq;
CREATE SEQUENCE dynamo.process_domain_entity_seq
    START WITH 1
    INCREMENT BY 1;


CREATE TABLE dynamo.process_domain_entity (
    id BIGINT NOT NULL DEFAULT (NEXT VALUE FOR dynamo.process_domain_entity_seq),
    entity_name VARCHAR(255),
    entity_properties JSON,
    process_instance_user_definition_key VARCHAR(255) NOT NULL,
    created_on TIMESTAMP,
    modified_on TIMESTAMP,
    CONSTRAINT process_domain_entity_pkey PRIMARY KEY (id)
);

