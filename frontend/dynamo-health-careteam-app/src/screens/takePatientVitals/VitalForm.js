/* eslint-disable import/prefer-default-export */
export const takeVitalsFormJson = {
  components: [
    {
      text: 'Vitals',
      label: 'Text view',
      type: 'text',
      layout: {
        row: 'Row_1wh4gor',
        columns: null,
      },
      id: 'Field_1b4m4ub',
    },
    {
      label: 'Systolic Blood Pressure (mmHg)',
      type: 'textfield',
      layout: {
        row: 'Row_0t6ia9n',
        columns: null,
      },
      id: 'Field_1xkde6p',
      key: 'patientVitals.systolicBloodPressure',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Vitals',
        display_name: 'Systolic Blood Pressure (mmHg)',
      },
    },
    {
      label: 'Diastolic Blood Pressure (mmHg)',
      type: 'textfield',
      layout: {
        row: 'Row_0t6ia9n',
        columns: null,
      },
      id: 'Field_0ybqw79',
      key: 'patientVitals.diastolicBloodPressure',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Vitals',
        display_name: 'Diastolic Blood Pressure (mmHg)',
      },
    },
    {
      label: 'Heart Rate (BPM)',
      type: 'textfield',
      layout: {
        row: 'Row_1doxfan',
        columns: null,
      },
      id: 'Field_075q31s',
      key: 'patientVitals.heartRate',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Vitals',
        display_name: 'Heart Rate (BPM)',
      },
    },
    {
      label: 'Height (cms) ',
      type: 'textfield',
      layout: {
        row: 'Row_1doxfan',
        columns: null,
      },
      id: 'Field_1h6u6ga',
      key: 'patientVitals.height',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Vitals',
        display_name: 'Height (cms) ',
      },
    },
    {
      label: 'Weight (lbs) ',
      type: 'textfield',
      layout: {
        row: 'Row_0fo1hiw',
        columns: null,
      },
      id: 'Field_00kb61d',
      key: 'patientVitals.weight',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Vitals',
        display_name: 'Weight (lbs) ',
      },
    },
    {
      label: 'Notes',
      type: 'textarea',
      layout: {
        row: 'Row_06o9zt2',
        columns: null,
      },
      id: 'Field_1rlwjww',
      key: 'patientVitals.notes',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Vitals',
        display_name: 'Notes',
      },
    },
  ],
  type: 'default',
  id: 'Form_3',
  exporter: {
    name: 'Camunda Modeler',
    version: '5.14.0',
  },
  executionPlatform: 'Camunda Platform',
  executionPlatformVersion: '7.19.0',
  schemaVersion: 10,
};
