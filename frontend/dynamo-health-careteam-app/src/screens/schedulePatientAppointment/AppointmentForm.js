// eslint-disable-next-line import/prefer-default-export
export const appoitmentFormJson = {
  components: [
    {
      text: 'Schedule Appointment',
      label: 'Text view',
      type: 'text',
      layout: {
        row: 'Row_0ludsrl',
        columns: null,
      },
      id: 'Field_1xsi5re',
    },
    {
      label: 'Date',
      type: 'textfield',
      layout: {
        row: 'Row_0xban7d',
        columns: null,
      },
      id: 'Field_187bnwy',
      key: 'scheduleAppoinment.date',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Schedule Appointment',
        display_name: 'Date',
      },
    },
    {
      label: 'Time',
      type: 'textfield',
      layout: {
        row: 'Row_1jmkq7q',
        columns: null,
      },
      id: 'Field_1wlw7ja',
      key: 'scheduleAppoinment.time',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Schedule Appointment',
        display_name: 'Time',
      },
    },
    {
      label: 'Notes',
      type: 'textarea',
      layout: {
        row: 'Row_108rchd',
        columns: null,
      },
      id: 'Field_03m26r4',
      key: 'scheduleAppoinment.notes',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Schedule Appointment',
        display_name: 'Notes',
      },
    },
  ],
  type: 'default',
  id: 'Form_1ahtu1i',
  exporter: {
    name: 'Camunda Modeler',
    version: '5.14.0',
  },
  executionPlatform: 'Camunda Platform',
  executionPlatformVersion: '7.19.0',
  schemaVersion: 10,
};
