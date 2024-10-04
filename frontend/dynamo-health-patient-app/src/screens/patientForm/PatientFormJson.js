// eslint-disable-next-line import/prefer-default-export
export const patientForm = {
  components: [
    {
      text: 'Intake Form\n\n',
      label: 'Text view',
      type: 'text',
      layout: {
        row: 'Row_04fz70v',
        columns: null,
      },
      id: 'Field_0w3d5hy',
    },
    {
      text: 'General Information',
      label: 'Text view',
      type: 'text',
      layout: {
        row: 'Row_1a8jxkr',
        columns: null,
      },
      id: 'Field_166ljz3',
    },
    {
      label: 'First Name',
      type: 'textfield',
      layout: {
        row: 'Row_0r3ofh2',
        columns: null,
      },
      id: 'Field_0dbsdnl',
      key: 'intakeform.firstName',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'General Information',
        display_name: 'First Name',
      },
    },
    {
      label: 'Middle Name',
      type: 'textfield',
      layout: {
        row: 'Row_0r3ofh2',
        columns: null,
      },
      id: 'Field_03cnc06',
      key: 'intakeform.middleName',
      properties: {
        section_name: 'General Information',
        display_name: 'Middle Name',
      },
    },
    {
      label: 'Last Name',
      type: 'textfield',
      layout: {
        row: 'Row_1a2kttn',
        columns: null,
      },
      id: 'Field_1bvu2xw',
      key: 'intakeform.lastName',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'General Information',
        display_name: 'Last Name',
      },
    },
    {
      values: [
        {
          label: 'Male',
          value: 'male',
        },
        {
          label: 'Female',
          value: 'female',
        },
        {
          label: 'Others',
          value: 'others',
        },
      ],
      label: 'Gender',
      type: 'radio',
      layout: {
        row: 'Row_1prf4kc',
        columns: null,
      },
      id: 'Field_03zj37e',
      key: 'intakeform.gender',
      properties: {
        section_name: 'General Information',
        display_name: 'Gender',
      },
      validate: {
        required: true,
      },
    },
    {
      subtype: 'date',
      dateLabel: 'Date of Birth',
      label: 'Date time',
      type: 'datetime',
      layout: {
        row: 'Row_1c3m569',
        columns: null,
      },
      id: 'Field_1jhkprp',
      key: 'intakeform.date_of_birth',
      properties: {
        section_name: 'General Information',
        display_name: 'Date of Birth',
      },
      validate: {
        required: true,
      },
    },
    {
      values: [
        {
          label: 'English',
          value: 'English',
        },
        {
          label: 'Spanish',
          value: 'Spanish',
        },
        {
          label: 'French',
          value: 'French',
        },
        {
          label: 'German',
          value: 'German',
        },
        {
          label: 'Italian',
          value: 'Italian',
        },
        {
          label: 'Chinese',
          value: 'Chinese',
        },
        {
          label: 'Hindi',
          value: 'Hindi',
        },
      ],
      label: 'Language',
      type: 'select',
      layout: {
        row: 'Row_0l6tw0i',
        columns: null,
      },
      id: 'Field_11p9mcq',
      key: 'intakeform.language',
      properties: {
        section_name: 'General Information',
        display_name: 'Language',
      },
    },
    {
      label: 'Marital Status',
      type: 'textfield',
      layout: {
        row: 'Row_066l2pr',
        columns: null,
      },
      id: 'Field_1fnztlj',
      key: 'intakeform.maritalStatus',
      properties: {
        section_name: 'General Information',
        display_name: 'Marital Status',
      },
    },
    {
      label: 'Occupation',
      type: 'textfield',
      layout: {
        row: 'Row_1tfkjbz',
        columns: null,
      },
      id: 'Field_1yfkdji',
      key: 'intakeform.occupation',
      properties: {
        section_name: 'General Information',
        display_name: 'Occupation',
      },
    },
    {
      text: 'Contact Information',
      label: 'Text view',
      type: 'text',
      layout: {
        row: 'Row_0ciq225',
        columns: null,
      },
      id: 'Field_1x0m4tt',
    },
    {
      label: 'Email',
      type: 'textfield',
      layout: {
        row: 'Row_1vevyv8',
        columns: null,
      },
      id: 'Field_1y807q7',
      key: 'intakeform.email',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Contact Information',
        display_name: 'Email',
      },
    },
    {
      label: 'Phone no',
      type: 'textfield',
      layout: {
        row: 'Row_1vevyv8',
        columns: null,
      },
      id: 'Field_067b8wy',
      key: 'intakeform.phoneNo',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Contact Information',
        display_name: 'Phone no',
      },
    },
    {
      label: 'Address Line 1',
      type: 'textfield',
      layout: {
        row: 'Row_1vevyv8',
        columns: null,
      },
      id: 'Field_0zmjoth',
      key: 'intakeform.addressLine1',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Contact Information',
        display_name: 'Address Line 1',
      },
    },
    {
      label: 'Address Line 2',
      type: 'textfield',
      layout: {
        row: 'Row_195n83i',
        columns: null,
      },
      id: 'Field_12ynnn5',
      key: 'intakeform.addressLine2',
      properties: {
        section_name: 'Contact Information',
        display_name: 'AddresLine 2',
      },
    },
    {
      label: 'City',
      type: 'textfield',
      layout: {
        row: 'Row_1wj1moy',
        columns: null,
      },
      id: 'Field_1tqyd1h',
      key: 'intakeform.city',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Contact Information',
        display_name: 'City',
      },
    },
    {
      label: 'State',
      type: 'textfield',
      layout: {
        row: 'Row_1wj1moy',
        columns: null,
      },
      id: 'Field_0dqnl6v',
      key: 'intakeform.state',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Contact Information',
        display_name: 'State',
      },
    },
    {
      label: 'Zipcode',
      type: 'textfield',
      layout: {
        row: 'Row_0eo5t3y',
        columns: null,
      },
      id: 'Field_0v19eba',
      key: 'intakeform.zipcode',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Contact Information',
        display_name: 'Zipcode',
      },
    },
    {
      text: 'Emergency Contact',
      label: 'Text view',
      type: 'text',
      layout: {
        row: 'Row_03go7n7',
        columns: null,
      },
      id: 'Field_08uders',
    },
    {
      label: 'Name',
      type: 'textfield',
      layout: {
        row: 'Row_0fvsi8w',
        columns: null,
      },
      id: 'Field_1wjv6jx',
      key: 'intakeform.name',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Emergency Contact',
        display_name: 'Name',
      },
    },
    {
      label: 'Relationship',
      type: 'textfield',
      layout: {
        row: 'Row_0fvsi8w',
        columns: null,
      },
      id: 'Field_0yokemk',
      key: 'intakeform.relationship',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Emergency Contact',
        display_name: 'Relationship',
      },
    },
    {
      label: 'Phone No',
      type: 'textfield',
      layout: {
        row: 'Row_0fvsi8w',
        columns: null,
      },
      id: 'Field_18nkhk5',
      key: 'intakeform.phoneNo1',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Emergency Contact',
        display_name: 'Phone No',
      },
    },
    {
      text: 'Insurance Information',
      label: 'Text view',
      type: 'text',
      layout: {
        row: 'Row_16zz00a',
        columns: null,
      },
      id: 'Field_0jvncet',
    },
    {
      label: 'Group Number',
      type: 'textfield',
      layout: {
        row: 'Row_1laa4zl',
        columns: null,
      },
      id: 'Field_1uoekk8',
      key: 'intakeform.groupNumber',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Insurance Information',
        display_name: 'Group Number',
      },
    },
    {
      label: 'Policy Number',
      type: 'textfield',
      layout: {
        row: 'Row_1laa4zl',
        columns: null,
      },
      id: 'Field_05qhyx0',
      key: 'intakeform.PolicyNumber',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Insurance Information',
        display_name: 'Policy Number',
      },
    },
    {
      label: 'Insurance Provider',
      type: 'textfield',
      layout: {
        row: 'Row_1laa4zl',
        columns: null,
      },
      id: 'Field_0epfsbg',
      key: 'intakeform.InsuranceProvider',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Insurance Information',
        display_name: 'Insurance Provider',
      },
    },
    {
      text: 'Medical History',
      label: 'Text view',
      type: 'text',
      layout: {
        row: 'Row_0q3t1qn',
        columns: null,
      },
      id: 'Field_1g5y20z',
    },
    {
      label: 'Previous and current medical conditions',
      type: 'textarea',
      layout: {
        row: 'Row_1wv4ruf',
        columns: null,
      },
      id: 'Field_1yg9elu',
      key: 'intakeform.Conditions',
      properties: {
        section_name: 'Medical History',
        display_name:
          'Previous and current medical conditionsPrevious and current medical conditions',
      },
    },
    {
      label: 'Allergies',
      type: 'textarea',
      layout: {
        row: 'Row_1wv4ruf',
        columns: null,
      },
      id: 'Field_003sygw',
      key: 'intakeform.allergies',
      properties: {
        section_name: 'Medical History',
        display_name: 'Allergies',
      },
    },
    {
      label: 'Current Medications',
      type: 'textarea',
      layout: {
        row: 'Row_1wv4ruf',
        columns: null,
      },
      id: 'Field_1yg7hyg',
      key: 'intakeform.currentMedications',
      properties: {
        section_name: 'Medical History',
        display_name: 'Current Medications',
      },
    },
    {
      text: 'Smoking History',
      label: 'Text view',
      type: 'text',
      layout: {
        row: 'Row_1qzt5qj',
        columns: null,
      },
      id: 'Field_1hms7qv',
    },
    {
      values: [
        {
          label: 'Current Smoker',
          value: 'current_smoker',
        },
        {
          label: 'Former Smoker',
          value: 'former_smoker',
        },
        {
          label: 'Never Smoked',
          value: 'never_smoked',
        },
      ],
      label: 'Smoking History',
      type: 'radio',
      layout: {
        row: 'Row_1kxs0bd',
        columns: null,
      },
      id: 'Field_1y53bz4',
      key: 'intakeform.smokingHistory',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Smoking History',
        display_name: 'Smoking History',
      },
    },
    {
      values: [
        {
          label: 'Current Drinker',
          value: 'current_drinker',
        },
        {
          label: 'Former Drinker',
          value: 'Former Drinker',
        },
        {
          label: 'Never Drinked',
          value: 'Never Drinked',
        },
      ],
      label: 'Alcohol Use',
      type: 'radio',
      layout: {
        row: 'Row_1kxs0bd',
        columns: null,
      },
      id: 'Field_1t3z3js',
      key: 'intakeform.alcoholUse',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Smoking History',
        display_name: 'Alcohol Use',
      },
    },
    {
      text: 'Purpose of Visit',
      label: 'Text view',
      type: 'text',
      layout: {
        row: 'Row_1cziu8l',
        columns: null,
      },
      id: 'Field_1ramgsu',
    },
    {
      label: 'Symptoms',
      type: 'textfield',
      layout: {
        row: 'Row_1taajj4',
        columns: null,
      },
      id: 'Field_022u9ix',
      key: 'intakeform.smymptoms',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Purpose of Visit',
        display_name: 'Symptoms',
      },
    },
    {
      values: [
        {
          label: 'Constantly',
          value: 'Constantly',
        },
        {
          label: 'Frequently',
          value: 'Frequently',
        },
        {
          label: 'Occasionally',
          value: 'Occasionally',
        },
        {
          label: 'Intermittently',
          value: 'Intermittently',
        },
      ],
      label: 'How often do you experience your symptoms?',
      type: 'radio',
      layout: {
        row: 'Row_0ruy931',
        columns: null,
      },
      id: 'Field_1qkk7du',
      key: 'intakeform.symptomsExperience',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Purpose of Visit',
        display_name: 'How often do you experience your symptoms?',
      },
    },
    {
      values: [
        {
          label: 'Getting Worse',
          value: 'getting_worse',
        },
        {
          label: 'Staying the same',
          value: 'staying_the_same',
        },
        {
          label: 'Getting Better',
          value: 'getting_better',
        },
      ],
      label: 'How are your symptoms changing over time?',
      type: 'radio',
      layout: {
        row: 'Row_175db29',
        columns: null,
      },
      id: 'Field_0jkjh84',
      key: 'intakeform.symptomsChangingOverTime',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Purpose of Visit',
        display_name: 'How are your symptoms changing over time?',
      },
    },
    {
      values: [
        {
          label: '1',
          value: '1',
        },
        {
          label: '2',
          value: '2',
        },
        {
          label: '3',
          value: '3',
        },
        {
          label: '4',
          value: '4',
        },
        {
          label: '5',
          value: '5',
        },
        {
          label: '6',
          value: '6',
        },
        {
          label: '7',
          value: '7',
        },
        {
          label: '8',
          value: '8',
        },
        {
          label: '9',
          value: '9',
        },
        {
          label: '10',
          value: '10',
        },
      ],
      label: 'On a scale of 1-10, how do you rate the pain?',
      type: 'select',
      layout: {
        row: 'Row_1x1ndux',
        columns: null,
      },
      id: 'Field_0msmb45',
      key: 'intakeform.ratePain',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Purpose of Visit',
        display_name: 'On a scale of 1-10, how do you rate the pain?',
      },
    },
    {
      label: 'How long have you had this pain? (days)',
      type: 'textfield',
      layout: {
        row: 'Row_1x1ndux',
        columns: null,
      },
      id: 'Field_0mm9iuj',
      key: 'intakeform.painInDays',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Purpose of Visit',
        display_name: 'How long have you had this pain? (days)',
      },
    },
    {
      label:
        'I consent that the above provided information is accurate and can be used for the purpose of my medical treatent? ',
      type: 'checkbox',
      layout: {
        row: 'Row_1x1ndux',
        columns: null,
      },
      id: 'Field_0tf4tpn',
      key: 'consent',
      validate: {
        required: true,
      },
      properties: {
        section_name: 'Purpose of Visit',
      },
    },
  ],
  type: 'default',
  id: 'Form_1',
  exporter: {
    name: 'Camunda Modeler',
    version: '5.14.0',
  },
  executionPlatform: 'Camunda Platform',
  executionPlatformVersion: '7.19.0',
  schemaVersion: 10,
};
