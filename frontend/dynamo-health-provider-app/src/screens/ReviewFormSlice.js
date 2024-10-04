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
