import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Appbar from '../components/Appbar/Appbar';
import PatientsForReviewList from '../screens/patientForReview/PatientsForReviewList';
import ReviewIntakeForm from '../screens/reviewIntakeForm/ReviewIntakeForm';
import ViewReviewPatient from '../screens/viewReviewPatient/ViewReviewPatient';
import UsersList from '../screens/usersManagement/UsersList';

export default function AppRouter({user, signOut}) {
  return (
    <>
      <Appbar user={user} signOut={signOut} />
      <Routes>
        <Route exact path="/" element={<PatientsForReviewList user={user} />} />
        <Route
          exact
          path="/reviewIntakeForm/:id"
          element={<ReviewIntakeForm user={user} />}
        />
        <Route
          exact
          path="/viewPatient/:id"
          element={<ViewReviewPatient user={user} />}
        />
        <Route exact path="/users" element={<UsersList user={user} />} />
      </Routes>
    </>
  );
}
