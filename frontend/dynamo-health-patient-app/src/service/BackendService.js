import axios from 'axios';

const BASE_URL_DYNAMO_PATIENT =
  process.env.REACT_APP_DYNAMO_HEALTH_PATIENT_SERVICE_URL;

class BackendService {
  startIntakeForm() {
    return axios.post(
      `${BASE_URL_DYNAMO_PATIENT}/api/patient/intake-forms/create `,
    );
  }

  getFormDetails(formId) {
    return axios.get(
      `${BASE_URL_DYNAMO_PATIENT}/api/patient/intake-forms/${formId}/submit-intake-form `,
    );
  }

  saveFormDetails(data) {
    return axios.post(
      `${BASE_URL_DYNAMO_PATIENT}/api/patient/intake-forms/${data?.formId}/submit-intake-form `,
      data.form,
    );
  }
}
export default new BackendService();
