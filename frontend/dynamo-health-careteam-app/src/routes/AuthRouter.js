import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from '../components/Login/Login';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import SetupAccount from '../components/SetupAccount/SetupAccount';

export default function AuthRouter({setAuthDetails}) {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Login setAuthDetails={setAuthDetails} />}
      />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />
      <Route exact path="/reset-password/:email" element={<ResetPassword />} />
      <Route exact path="/setup-account/:email" element={<SetupAccount />} />
    </Routes>
  );
}
