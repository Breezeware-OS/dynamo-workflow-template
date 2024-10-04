import React from 'react';
import {Route, Routes} from 'react-router-dom';
import TaskList from '../screens/listOfTasks/TaskList';
import Appbar from '../components/Appbar/Appbar';
import ReviewIntakeForm from '../screens/reviewIntakeForm/ReviewIntakeForm';
import TakeVitals from '../screens/takePatientVitals/TakeVitals';
import ScheduleAppointment from '../screens/schedulePatientAppointment/ScheduleAppointment';
import ViewTaskDetails from '../screens/viewTaskDetails/ViewTaskDetails';

export default function AppRouter({user, signOut}) {
  return (
    <>
      <Appbar user={user} signOut={signOut} />
      <Routes>
        <Route exact path="/" element={<TaskList user={user} />} />
        <Route
          exact
          path="/reviewIntakeForm/:id"
          element={<ReviewIntakeForm user={user} />}
        />
        <Route
          exact
          path="/takeVitals/:id"
          element={<TakeVitals user={user} />}
        />
        <Route
          exact
          path="/scheduleAppointment/:id"
          element={<ScheduleAppointment user={user} />}
        />
        <Route
          exact
          path="/viewTask/:id"
          element={<ViewTaskDetails user={user} />}
        />
      </Routes>
    </>
  );
}
