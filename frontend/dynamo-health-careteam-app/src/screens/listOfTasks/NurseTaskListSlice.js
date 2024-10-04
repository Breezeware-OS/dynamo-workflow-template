import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import BackendService from '../../service/BackendService';

export const fetchNurseTaskListData = createAsyncThunk(
  '/taskList',
  async data => {
    const response = await BackendService.fetchNurseTaskListData(data);
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

const nurseTaskListSlice = createSlice({
  name: 'NurseTaskList',
  initialState: {
    status: '',
    taskData: [],
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
      .addCase(fetchNurseTaskListData.pending, state => {
        state.status = 'loading';
        state.message = null;
        state.notification = false;
        state.error = false;
      })
      .addCase(fetchNurseTaskListData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = false;
        state.message = null;
        state.notification = false;
        state.taskData = action.payload;
      })
      .addCase(fetchNurseTaskListData.rejected, state => {
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

export const nurseTaskListActions = nurseTaskListSlice.actions;
export default nurseTaskListSlice;
