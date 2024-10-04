import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import BackendService from '../service/BackendService';

export const fetchReviewIntakeFormData = createAsyncThunk(
  '/intakeForm',
  async data => {
    const response = await BackendService.fetchIntakeFormData(data);
    return response.data;
  },
);

export const saveReviewIntakeFormData = createAsyncThunk(
  '/saveIntakeForm',
  async data => {
    const response = await BackendService.saveIntakeFormData(data);
    return response.data;
  },
);

export const fetchTakeVitalsData = createAsyncThunk(
  '/vitalsForm',
  async data => {
    const response = await BackendService.fetchVitalsFormData(data);
    return response.data;
  },
);

export const saveTakeVitalsData = createAsyncThunk(
  '/saveVitalsForm',
  async data => {
    const response = await BackendService.saveVitalsFormData(data);
    return response.data;
  },
);

export const fetchScheduleAppointmentData = createAsyncThunk(
  '/appointmentForm',
  async data => {
    const response = await BackendService.fetchAppointmentFormData(data);
    return response.data;
  },
);

export const saveScheduleAppointmentData = createAsyncThunk(
  '/saveAppointmentForm',
  async data => {
    const response = await BackendService.saveAppointmentFormData(data);
    return response.data;
  },
);

export const fetchViewCompletedTaskData = createAsyncThunk(
  '/viewCompletedForm',
  async data => {
    const response = await BackendService.fetchViewTaskData(data);
    return response.data;
  },
);

const reviewFormSlice = createSlice({
  name: 'ReviewFormSlice',
  initialState: {
    status: '',
    message: '',
    error: false,
    notification: false,
    intakeFormData: [],
    vitalFormData: [],
    scheduleAppointmentData: [],
    completedTaskData: [],
  },
  reducers: {
    closeNotification(state) {
      state.notification = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewIntakeFormData.pending, state => {
        state.status = 'loading';
        state.message = null;
        state.notification = false;
        state.error = false;
      })
      .addCase(fetchReviewIntakeFormData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = false;
        state.message = null;
        state.notification = false;
        state.intakeFormData = action.payload;
      })
      .addCase(fetchReviewIntakeFormData.rejected, state => {
        state.status = 'error';
        state.message =
          'An error occurred while fetching review intake form. Please try again.';
        state.notification = true;
        state.error = true;
        state.intakeFormData = null;
      })
      .addCase(saveReviewIntakeFormData.pending, state => {
        state.status = 'loading';
        state.message = null;
        state.notification = false;
        state.error = false;
      })
      .addCase(saveReviewIntakeFormData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = false;
        state.message = null;
        state.notification = false;
      })
      .addCase(saveReviewIntakeFormData.rejected, state => {
        state.status = 'error';
        state.message =
          'An error occurred while saving review intake form. Please try again.';
        state.notification = true;
        state.error = true;
        state.intakeFormData = null;
      })
      .addCase(fetchTakeVitalsData.pending, state => {
        state.status = 'loading';
        state.message = null;
        state.notification = false;
        state.error = false;
      })
      .addCase(fetchTakeVitalsData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = false;
        state.message = null;
        state.notification = false;
        state.vitalFormData = action.payload;
      })
      .addCase(fetchTakeVitalsData.rejected, state => {
        state.status = 'error';
        state.message =
          'An error occurred while fetching vitals form. Please try again.';
        state.notification = true;
        state.error = true;
        state.vitalFormData = null;
      })
      .addCase(saveTakeVitalsData.pending, state => {
        state.status = 'loading';
        state.message = null;
        state.notification = false;
        state.error = false;
      })
      .addCase(saveTakeVitalsData.fulfilled, state => {
        state.status = 'succeeded';
        state.error = false;
        state.message = null;
        state.notification = false;
      })
      .addCase(saveTakeVitalsData.rejected, state => {
        state.status = 'error';
        state.message =
          'An error occurred while saving vitals form. Please try again.';
        state.notification = true;
        state.error = true;
        state.vitalFormData = null;
      })
      .addCase(fetchScheduleAppointmentData.pending, state => {
        state.status = 'loading';
        state.message = null;
        state.notification = false;
        state.error = false;
      })
      .addCase(fetchScheduleAppointmentData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = false;
        state.message = null;
        state.notification = false;
        state.scheduleAppointmentData = action.payload;
      })
      .addCase(fetchScheduleAppointmentData.rejected, state => {
        state.status = 'error';
        state.message =
          'An error occurred while fetching schedule apoointment form. Please try again.';
        state.notification = true;
        state.error = true;
        state.scheduleAppointmentData = null;
      })
      .addCase(saveScheduleAppointmentData.pending, state => {
        state.status = 'loading';
        state.message = null;
        state.notification = false;
        state.error = false;
      })
      .addCase(saveScheduleAppointmentData.fulfilled, state => {
        state.status = 'succeeded';
        state.error = false;
        state.message = null;
        state.notification = false;
      })
      .addCase(saveScheduleAppointmentData.rejected, state => {
        state.status = 'error';
        state.message =
          'An error occurred while saving schedule apoointment form. Please try again.';
        state.notification = true;
        state.error = true;
        state.scheduleAppointmentData = null;
      })
      .addCase(fetchViewCompletedTaskData.pending, state => {
        state.status = 'loading';
        state.message = null;
        state.notification = false;
        state.error = false;
      })
      .addCase(fetchViewCompletedTaskData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = false;
        state.message = null;
        state.notification = false;
        state.completedTaskData = action.payload;
      })
      .addCase(fetchViewCompletedTaskData.rejected, state => {
        state.status = 'error';
        state.message =
          'An error occurred while fetching completed data. Please try again.';
        state.notification = true;
        state.error = true;
        state.completedTaskData = null;
      });
  },
});

export const reviewFormSliceActions = reviewFormSlice.actions;
export default reviewFormSlice;
