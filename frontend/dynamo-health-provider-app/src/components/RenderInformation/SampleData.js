// eslint-disable-next-line import/prefer-default-export
export const samplePatientData = {
  'General Information': [
    {key: 'firstName', display_name: 'First Name', value: 'John'},
    {key: 'middleName', display_name: 'Middle Name', value: 'Robert'},
    {key: 'tName', display_name: 'Last Name', value: 'Doe'},
    {key: 'gender', display_name: 'Gender', value: 'male'},
    {key: 'date_of_birth', display_name: 'Date of Birth', value: '1990-05-15'},
    {key: 'language', display_name: 'Language', value: 'English'},
    {key: 'maritalStatus', display_name: 'Marital Status', value: 'Single'},
    {key: 'occupation', display_name: 'Occupation', value: 'Software Engineer'},
  ],
  'Contact Information': [
    {key: 'email', display_name: 'Email', value: 'john.doe@example.com'},
    {key: 'phoneNo', display_name: 'Phone no', value: '+1 123-456-7890'},
    {key: 'addressLine1', display_name: 'Address Line 1', value: '123 Main St'},
    {key: 'addressLine2', display_name: 'AddresLine 2', value: 'Apt 456'},
    {key: 'city', display_name: 'City', value: 'Anytown'},
    {key: 'state', display_name: 'State', value: 'CA'},
    {key: 'zipcode', display_name: 'Zipcode', value: '12345'},
  ],
  'Emergency Contact': [
    {key: 'name', display_name: 'Name', value: 'Jane Doe'},
    {key: 'relationShip', display_name: 'Relationship', value: 'Spouse'},
    {key: 'phoneNo1', display_name: 'Phone No', value: '+1 234-567-8901'},
  ],
  'Insurance Information': [
    {key: 'groupNumber', display_name: 'Group Number', value: 'GRP12345'},
    {key: 'PolicyNumber', display_name: 'Policy Number', value: 'POL98765'},
    {
      key: 'InsuranceProvider',
      display_name: 'Insurance Provider',
      value: 'ABC Insurance Co.',
    },
  ],
  'Medical History': [
    {
      key: 'Conditions',
      display_name:
        'Previous and current medical conditionsPrevious and current medical conditions',
      value: 'Hypertension, Diabetes',
    },
    {key: 'allergies', display_name: 'Allergies', value: 'Penicillin, Peanuts'},
    {
      key: 'currentMedications',
      display_name: 'Current Medications',
      value: 'Aspirin, Metformin',
    },
  ],
  'Smoking History': [
    {
      key: 'smokingHistory',
      display_name: 'Smoking History',
      value: 'former_smoker',
    },
    {key: 'alcoholUse', display_name: 'Alcohol Use', value: 'current_drinker'},
  ],
  'Purpose of Visit': [
    {key: 'smymptoms', display_name: 'Symptoms', value: 'Headache, Fatigue'},
    {
      key: 'symptomsExperience',
      display_name: 'How often do you experience your symptoms?',
      value: 'Frequently',
    },
    {
      key: 'symptomsChangingOverTime',
      display_name: 'How are your symptoms changing over time?',
      value: 'getting_worse',
    },
    {
      key: 'ratePain',
      display_name: 'On a scale of 1-10, how do you rate the pain?',
      value: '7',
    },
    {
      key: 'painInDays',
      display_name: 'How long have you had this pain? (days)',
      value: '14',
    },
  ],
};
