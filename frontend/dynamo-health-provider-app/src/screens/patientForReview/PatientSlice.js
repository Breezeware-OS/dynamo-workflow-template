import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import BackendService from '../../service/BackendService';

export const fetchPatientListData = createAsyncThunk(
  '/taskList',
  async data => {
    const response = await BackendService.fetchPatientForReviewData(data);
    return response.data;
  },
);

// export const fetchNurseTaskListCount = createAsyncThunk(
//   '/taskList/count',
//   async data => {
//     const response = await BackendService.fetchNurseTaskListCount(data);
//     return response.data;
//   },
// );

const patientReviewListSlice = createSlice({
  name: 'PatientReviewList',
  initialState: {
    status: '',
    patientData: [],
    taskDataCount: null,
    message: '',
    error: false,
    notification: false,
  },
  reducers: {
    closeNotification(state) {
      state.notification = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPatientListData.pending, state => {
        state.status = 'loading';
        state.message = null;
        state.notification = false;
        state.error = false;
      })
      .addCase(fetchPatientListData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = false;
        state.message = null;
        state.notification = false;
        state.patientData = action.payload;
      })
      .addCase(fetchPatientListData.rejected, state => {
        state.status = 'error';
        state.message =
          'An error occurred while fetching task data. Please try again.';
        state.notification = true;
        state.error = true;
      });
    // .addCase(fetchNurseTaskListCount.pending, state => {
    //   state.status = 'loading';
    //   state.message = null;
    //   state.notification = false;
    //   state.error = false;
    // })
    // .addCase(fetchNurseTaskListCount.fulfilled, (state, action) => {
    //   state.status = 'succeeded';
    //   state.error = false;
    //   state.message = null;
    //   state.notification = false;
    //   state.taskDataCount = action.payload;
    // })
    // .addCase(fetchNurseTaskListCount.rejected, state => {
    //   state.status = 'error';
    //   state.message =
    //     'An error occurred while fetching task list count. Please try again.';
    //   state.notification = true;
    //   state.error = true;
    // });
  },
});
export const patientReviewListActions = patientReviewListSlice.actions;
export default patientReviewListSlice;
