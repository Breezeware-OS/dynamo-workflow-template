import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import BackendService from '../../service/BackendService';

export const startForm = createAsyncThunk('/startForm', async data => {
  const response = await BackendService.startIntakeForm(data);
  return response.data;
});

export const fetchForm = createAsyncThunk('/getForm', async data => {
  const response = await BackendService.getFormDetails(data);
  return response.data;
});

export const saveForm = createAsyncThunk('/saveForm', async data => {
  const response = await BackendService.saveFormDetails(data);
  return response.data;
});

const intakeFormSlice = createSlice({
  name: 'IntakeFormSlice',
  initialState: {
    status: '',
    message: '',
    error: false,
    notification: false,
    intakeFormData: null,
  },
  reducers: {
    closeNotification(state) {
      state.notification = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchForm.pending, state => {
        state.status = 'loading';
        state.message = null;
        state.notification = false;
        state.error = false;
      })
      .addCase(fetchForm.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = false;
        state.message = null;
        state.notification = false;
        state.intakeFormData = action.payload;
      })
      .addCase(fetchForm.rejected, state => {
        state.status = 'error';
        state.message =
          'An error occurred while fetching intake form. Please try again.';
        state.notification = true;
        state.error = true;
        state.intakeFormData = null;
      })
      .addCase(saveForm.pending, state => {
        state.status = 'loading';
        state.message = null;
        state.notification = false;
        state.error = false;
      })
      .addCase(saveForm.fulfilled, state => {
        state.status = 'succeeded';
        state.error = false;
        state.message = null;
        state.notification = false;
      })
      .addCase(saveForm.rejected, state => {
        state.status = 'error';
        state.message =
          'An error occurred while saving intake form. Please try again.';
        state.notification = true;
        state.error = true;
        state.intakeFormData = null;
      });
  },
});

export const intakeFormSliceActions = intakeFormSlice.actions;
export default intakeFormSlice;
