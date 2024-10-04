import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import intakeFormSlice from '../screens/patientForm/FomSlice';

const store = configureStore({
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
  reducer: {
    intakeForm: intakeFormSlice.reducer,
  },
});

export default store;
