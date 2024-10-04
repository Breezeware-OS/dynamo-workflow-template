import axios from 'axios';

const BASE_URL_DYNAMO_HEALTH_CARETEAM =
  process.env.REACT_APP_DYNAMO_HEALTH_CARETEAM_SERVICE_URL;

class BackendService {
  fetchNurseTaskListData(params) {
    return axios.get(
      `${BASE_URL_DYNAMO_HEALTH_CARETEAM}/api/care-team/patient-management/patient/intake-forms`,
      {
        params: {
          sort: `${
            params.sortItem === 'type'
              ? 'status'
              : params?.sortItem === 'patient'
              ? 'patientFirstName'
              : params?.sortItem
          },${params.sortOrder}`,
          'page-size': '15',
          'page-no': params.page || '0',
          'patient-name': params.searchText,
          'intake-form-from-date': params?.filterFromDate,
          'intake-form-to-date': params?.filterToDate,
        },
      },
    );
  }

  fetchNurseTaskListCount(params) {
    return axios.get(
      `${BASE_URL_DYNAMO_HEALTH_CARETEAM}/dynamo/showcase-app/applications/status-count/${params?.userId}`,
    );
  }

  fetchIntakeFormData(formId) {
    return axios.get(
      `${BASE_URL_DYNAMO_HEALTH_CARETEAM}/api/care-team/patient-management/review-intake-form/${formId}`,
    );
  }

  saveIntakeFormData(data) {
    return axios.post(
      `${BASE_URL_DYNAMO_HEALTH_CARETEAM}/api/care-team/patient-management/review-intake-form/${data?.formId}`,
      data?.form,
    );
  }

  fetchVitalsFormData(formId) {
    return axios.get(
      `${BASE_URL_DYNAMO_HEALTH_CARETEAM}/api/care-team/patient-management/patients/vitals?intake-form-id=${formId}`,
    );
  }

  saveVitalsFormData(data) {
    return axios.post(
      `${BASE_URL_DYNAMO_HEALTH_CARETEAM}/api/care-team/patient-management/patients/vitals?intake-form-id=${data?.formId}`,
      data?.form,
    );
  }

  fetchAppointmentFormData(formId) {
    return axios.get(
      `${BASE_URL_DYNAMO_HEALTH_CARETEAM}/api/care-team/patient-management/patients/schedule-followup?intake-form-id=${formId}`,
    );
  }

  saveAppointmentFormData(data) {
    return axios.post(
      `${BASE_URL_DYNAMO_HEALTH_CARETEAM}/api/care-team/patient-management/patients/schedule-followup?intake-form-id=${data?.formId}`,
      data?.form,
    );
  }

  fetchViewTaskData(formId) {
    return axios.get(
      `${BASE_URL_DYNAMO_HEALTH_CARETEAM}/api/care-team/patient-management/patient-details?intake-form-id=${formId}`,
    );
  }

  accountSetup(data) {
    return axios.post(
      `${BASE_URL_DYNAMO_HEALTH_CARETEAM}/api/service/user-management/users/account-setup/`,
      data,
    );
  }
}
export default new BackendService();
