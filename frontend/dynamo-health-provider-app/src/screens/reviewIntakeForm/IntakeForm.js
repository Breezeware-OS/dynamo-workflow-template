// eslint-disable-next-line import/prefer-default-export
export const intakeFormJson = {
  components: [
    {
      text: 'Physician Notes',
      label: 'Text view',
      type: 'text',
      layout: {
        row: 'Row_16jg8rt',
        columns: null,
      },
      id: 'Field_0wij2tm',
    },
    {
      label: 'Chief Complaint',
      type: 'textarea',
      layout: {
        row: 'Row_10ily4t',
        columns: null,
      },
      id: 'Field_0zjozfe',
      key: 'physicianNotes.cheifComplaint',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Physician Notes',
        display_name: 'Chief Complaint',
      },
    },
    {
      label: 'History of Present Illness',
      type: 'textarea',
      layout: {
        row: 'Row_1xmlgzr',
        columns: null,
      },
      id: 'Field_1lijyo3',
      key: 'physicianNotes.historyOfPresentIllness',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Physician Notes',
        display_name: 'History of Present Illness',
      },
    },
    {
      label: 'Assessment and Plan',
      type: 'textarea',
      layout: {
        row: 'Row_1r3wkij',
        columns: null,
      },
      id: 'Field_1j64rd2',
      key: 'physicianNotes.assessmentAndPlan',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Physician Notes',
        display_name: 'Assessment and Plan',
      },
    },
  ],
  type: 'default',
  id: 'Form_0uvvpwt',
  exporter: {
    name: 'Camunda Modeler',
    version: '5.14.0',
  },
  executionPlatform: 'Camunda Platform',
  executionPlatformVersion: '7.15.0',
  schemaVersion: 10,
};
