import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './app/store';
import Home from './screens/home/Home';
import PatientDetailsForm from './screens/patientForm/PatientDetailsForm';
import Feedback from './screens/feedbackScreen/Feedback';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/patientForm/:id" element={<PatientDetailsForm />} />
        <Route exact path="/feedback" element={<Feedback />} />
      </Routes>
    </Provider>
  );
}

export default App;
