import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import patientReviewListSlice from '../screens/patientForReview/PatientSlice';
import reviewFormSlice from '../screens/ReviewFormSlice';
import userManagementSlice from '../screens/usersManagement/UserSlice';

const store = configureStore({
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
  reducer: {
    patientReviewList: patientReviewListSlice.reducer,
    reviewForm: reviewFormSlice.reducer,
    users: userManagementSlice.reducer,
  },
});

export default store;
