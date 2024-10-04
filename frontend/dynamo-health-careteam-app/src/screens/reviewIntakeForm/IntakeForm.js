// eslint-disable-next-line import/prefer-default-export
export const intakeFormJson = {
  components: [
    {
      text: 'Review of Patient',
      label: 'Text view',
      type: 'text',
      layout: {
        row: 'Row_16tvfbd',
        columns: null,
      },
      id: 'Field_1ogfk97',
    },
    {
      text: 'Review of Systems',
      label: 'Text view',
      type: 'text',
      layout: {
        row: 'Row_17tvfbd',
        columns: null,
      },
      id: 'Field_1ogfk98',
    },
    {
      label: 'Constitutional',
      type: 'textfield',
      layout: {
        row: 'Row_09pqyyd',
        columns: null,
      },
      id: 'Field_1porcqj',
      key: 'patientReview.constitutional',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Review of Systems',
        display_name: 'Constitutional',
      },
    },
    {
      label: 'Eyes',
      type: 'textfield',
      layout: {
        row: 'Row_09pqyyd',
        columns: null,
      },
      id: 'Field_0ghb3bi',
      key: 'patientReview.eyes',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Review of Systems',
        display_name: 'Eyes',
      },
    },
    {
      label: 'ENT',
      type: 'textfield',
      layout: {
        row: 'Row_0fd9fe9',
        columns: null,
      },
      id: 'Field_11azrv0',
      key: 'patientReview.ent',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Review of Systems',
        display_name: 'ENT',
      },
    },
    {
      label: 'Skin/Breast',
      type: 'textfield',
      layout: {
        row: 'Row_0fd9fe9',
        columns: null,
      },
      id: 'Field_17gvzof',
      key: 'patientReview.skinOrBreast',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Review of Systems',
        display_name: 'Skin/Breast',
      },
    },
    {
      label: 'Cardiovascular',
      type: 'textfield',
      layout: {
        row: 'Row_0w59ddi',
        columns: null,
      },
      id: 'Field_0kihi4f',
      key: 'patientReview.cardiovascular',
      properties: {
        section_name: 'Review of Systems',
        display_name: 'Cardiovascular',
      },
    },
    {
      label: 'Pulmonary',
      type: 'textfield',
      layout: {
        row: 'Row_0w59ddi',
        columns: null,
      },
      id: 'Field_0l9grx9',
      key: 'patientReview.pulmonary',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Review of Systems',
        display_name: 'Pulmonary',
      },
    },
    {
      label: 'Endocrine',
      type: 'textfield',
      layout: {
        row: 'Row_10h5uqo',
        columns: null,
      },
      id: 'Field_01x91tk',
      key: 'patientReview.endocrine',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Review of Systems',
        display_name: 'Endocrine',
      },
    },
    {
      label: 'Gastro Intestinal',
      type: 'textfield',
      layout: {
        row: 'Row_10h5uqo',
        columns: null,
      },
      id: 'Field_0oybovy',
      key: 'patientReview.gastrointestinal',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Review of Systems',
        display_name: 'Gastro Intestinal',
      },
    },
    {
      label: 'Genito Urinary',
      type: 'textfield',
      layout: {
        row: 'Row_0x1gvrx',
        columns: null,
      },
      id: 'Field_0d4uwmc',
      key: 'patientReview.genitoUrinary',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Review of Systems',
        display_name: 'Genito Urinary',
      },
    },
    {
      label: 'Musculo Skeletal',
      type: 'textfield',
      layout: {
        row: 'Row_0x1gvrx',
        columns: null,
      },
      id: 'Field_1wymic4',
      key: 'patientReview.musculoSkeletal',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Review of Systems',
        display_name: 'Musculo Skeletal',
      },
    },
    {
      label: 'Neurologic',
      type: 'textfield',
      layout: {
        row: 'Row_1hhjs3h',
        columns: null,
      },
      id: 'Field_1ef2q6l',
      key: 'patientReview.neurologic',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Review of Systems',
        display_name: 'Neurologic',
      },
    },
    {
      label: 'Notes',
      type: 'textarea',
      layout: {
        row: 'Row_014bbci',
        columns: null,
      },
      id: 'Field_0u9ku47',
      key: 'patientReview.notes',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Review of Systems',
        display_name: 'Notes',
      },
    },
    {
      values: [
        {
          label: 'Yes',
          value: 'yes',
        },
        {
          label: 'No',
          value: 'no',
        },
      ],
      label: 'Physician Visit Required',
      type: 'radio',
      layout: {
        row: 'Row_03yzh6i',
        columns: null,
      },
      id: 'Field_0onoctd',
      key: 'patientReview.physicianVisitRequired',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Review of Systems',
        display_name: 'Physician Visit Required',
      },
    },
  ],
  type: 'default',
  id: 'Form_2',
  exporter: {
    name: 'Camunda Modeler',
    version: '5.14.0',
  },
  executionPlatform: 'Camunda Platform',
  executionPlatformVersion: '7.19.0',
  schemaVersion: 10,
};
