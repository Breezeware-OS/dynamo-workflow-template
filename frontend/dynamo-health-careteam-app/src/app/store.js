import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import nurseTaskListSlice from '../screens/listOfTasks/NurseTaskListSlice';
import reviewFormSlice from '../screens/ReviewFormSlice';

const store = configureStore({
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
  reducer: {
    nurseTaskList: nurseTaskListSlice.reducer,
    reviewForm: reviewFormSlice.reducer,
  },
});

export default store;
