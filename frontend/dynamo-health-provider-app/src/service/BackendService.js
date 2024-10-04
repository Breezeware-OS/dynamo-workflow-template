import axios from 'axios';

const BASE_URL_DYNAMO_HEALTH_PROVIDER =
  process.env.REACT_APP_DYNAMO_HEALTH_PROVIDER_SERVICE_URL;

class BackendService {
  fetchPatientForReviewData(params) {
    return axios.get(
      `${BASE_URL_DYNAMO_HEALTH_PROVIDER}/api/provider/patient-review/intake-forms`,
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
      `${BASE_URL_DYNAMO_HEALTH_PROVIDER}/dynamo/showcase-app/applications/status-count/${params?.userId}`,
    );
  }

  fetchUsers(data) {
    return axios.get(
      `${BASE_URL_DYNAMO_HEALTH_PROVIDER}/api/service/user-management/users`,
      {
        params: {
          username: data?.username || '',
          role: data?.role || '',
          'page-no': data?.pageNo || 0,
          'page-size': data?.size || 8,
          status: data?.userStatus || '',
          'created-date': data?.searchDate || '',
          sort:
            data?.sortItem && data?.sortOrder
              ? `${data.sortItem},${data.sortOrder.toUpperCase()}`
              : '',
        },
      },
    );
  }

  /**
   * Invite user
   * @param {*} data user data
   * @returns user invited response
   */
  inviteUser(data) {
    return axios.post(
      `${BASE_URL_DYNAMO_HEALTH_PROVIDER}/api/service/user-management/users/invite`,
      data,
    );
  }

  /**
   * Update existing user
   * @param {*} data user id,user updated data
   * @returns user updated response
   */
  editUser(data) {
    return axios.put(
      `${BASE_URL_DYNAMO_HEALTH_PROVIDER}/api/service/user-management/users`,
      data,
    );
  }

  /**
   * Suspend active user
   * @param {*} data user id
   * @returns user suspended response
   */
  suspendUser(data) {
    return axios.put(
      `${BASE_URL_DYNAMO_HEALTH_PROVIDER}/api/service/user-management/users/${data?.userId}/suspend`,
    );
  }

  /**
   * Reacive suspended user
   * @param {*} data user id
   * @returns user reactivated response
   */
  reactivateUser(data) {
    return axios.put(
      `${BASE_URL_DYNAMO_HEALTH_PROVIDER}/api/service/user-management/users/${data?.userId}/activate`,
    );
  }

  fetchIntakeFormData(formId) {
    return axios.get(
      `${BASE_URL_DYNAMO_HEALTH_PROVIDER}/api/provider/patient-review?intake-form-id=${formId}`,
    );
  }

  saveIntakeFormData(data) {
    return axios.post(
      `${BASE_URL_DYNAMO_HEALTH_PROVIDER}/api/provider/patient-review?intake-form-id=${data?.formId}`,
      data?.form,
    );
  }

  fetchViewTaskData(formId) {
    return axios.get(
      `${BASE_URL_DYNAMO_HEALTH_PROVIDER}/api/provider/patient-review/patient-details?intake-form-id=${formId}`,
    );
  }

  accountSetup(data) {
    return axios.post(
      `${BASE_URL_DYNAMO_HEALTH_PROVIDER}/api/service/user-management/users/account-setup/`,
      data,
    );
  }
}
export default new BackendService();
