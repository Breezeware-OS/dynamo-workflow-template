import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import {Button} from 'glide-design-system';
import {useNavigate} from 'react-router-dom';
import {Alert, Snackbar} from '@mui/material';
import {useDispatch} from 'react-redux';

import patientAppLogo from '../../assets/logo/patient_app_logo.jpg';
import dynamoLogo from '../../assets/logo/dynamo_logo.png';
import BackendService from '../../service/BackendService';
import {fetchForm} from '../patientForm/FomSlice';

export default function Home() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [errorNotification, setErrorNotification] = useState(false);

  const startFormHandler = () => {
    BackendService.startIntakeForm()
      .then(res => {
        navigate(`/patientForm/${res?.data?.id}`);
        // dispatch(fetchForm(res?.data?.id)).then(() => {
        //   navigate(`/patientForm/${res?.data?.id}`);
        // });
      })
      .catch(() => {
        setErrorNotification(true);
      });
  };

  return (
    <Grid container sx={{flex: 1, height: '100vh'}}>
      <Snackbar
        autoHideDuration={1000}
        id="snackbar"
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={errorNotification}
        onClose={() => setErrorNotification(false)}>
        <Alert
          id="alert"
          onClose={() => setErrorNotification(false)}
          severity="error">
          An error occured while starting the intake form. Please try again.
        </Alert>
      </Snackbar>
      <Grid item xs={12} md={9} sx={{flex: 1, height: '100'}}>
        <img
          style={{width: '100%', height: '100%'}}
          src={patientAppLogo}
          alt=""
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={3}
        sx={{
          // flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          display: 'flex',
        }}>
        <div>
          <img style={{width: 180, height: 68}} src={dynamoLogo} alt="" />

          <div style={{marginTop: 8}}>
            <Button onClick={startFormHandler}>Start Intake Form</Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
