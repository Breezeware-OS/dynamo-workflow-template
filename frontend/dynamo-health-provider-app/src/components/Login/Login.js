import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import {useNavigate} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {Button, Text, TextField} from 'glide-design-system';
import makeStyles from '@mui/styles/makeStyles';

import providerAppLogo from '../../assets/logo/provider_app_logo.jpg';
import dynamoLogo from '../../assets/logo/dynamo_logo.png';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email field required.')
    .email('Enter valid email.'),
  password: Yup.string().required('Password is required.'),
});

export default function Login({setAuthDetails}) {
  const navigate = useNavigate();

  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState(null);

  const formik = useFormik({
    initialValues: {},
    validationSchema: loginSchema,
    onSubmit: async values => {
      setLoading(true);
      handleLogin(values?.email, values?.password);
    },
    validateOnChange: false,
    enableReinitialize: true,
  });

  /**
   * When user submits API call is made using aws-amplify
   * Naviagte to account setup if user status requires new password or update authdetails and navigate to home page.
   * @param {*} userName email of the user
   * @param {*} password of the user
   */
  const handleLogin = (userName, password) => {
    Auth.signIn(userName, password)
      .then(res => {
        setResponseError(null);
        setLoading(false);
        if (res?.challengeName === 'NEW_PASSWORD_REQUIRED') {
          navigate(
            `/setup-account/${res?.challengeParam?.userAttributes?.email}`,
          );
        } else {
          setAuthDetails(res);
          navigate('/');
        }
      })
      .catch(err => {
        setResponseError(err?.message);
        setLoading(false);
      });
  };

  return (
    <Grid container sx={{flex: 1, height: '100vh'}}>
      <Grid item xs={12} md={9} sx={{flex: 1, height: '100'}}>
        <img
          style={{width: '100%', height: '100%'}}
          src={providerAppLogo}
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
        <form
          //  onSubmit={formik.handleSubmit}
          className={classes.form}>
          <Grid container spacing={1}>
            <Grid item xs={12} textAlign="center">
              <img style={{width: 180, height: 68}} src={dynamoLogo} alt="" />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Text type="h2">Physician Login</Text>
            </Grid>
            <Grid item xs={12}>
              <Text className={classes.inputLabel}>
                Email <span style={{color: 'red'}}>*</span>
              </Text>
              <TextField
                id="email"
                placeholder="Enter Email Address"
                autocomplete="off"
                name="email"
                style={{width: '100%', color: 'black'}}
                onChange={formik.handleChange}
              />
              {formik.errors?.email && (
                <Text className={classes.error}>{formik.errors?.email}</Text>
              )}
            </Grid>
            <Grid item xs={12}>
              <Text className={classes.inputLabel}>
                Password <span style={{color: 'red'}}>*</span>
              </Text>
              <TextField
                id="password"
                name="password"
                placeholder="Enter Password"
                type="password"
                onChange={formik.handleChange}
                style={{width: '100%', color: 'black'}}
              />
              {formik.errors?.password && (
                <Text className={classes.error}>{formik.errors?.password}</Text>
              )}
            </Grid>
            {responseError && (
              <Text
                style={{
                  color: 'red',
                  fontSize: '13px',
                  fontWeight: '400',
                  textAlign: 'center',
                }}>
                {responseError || null}
              </Text>
            )}
            <Grid item xs={12}>
              <Button
                id="login-btn"
                style={{width: '100%'}}
                type="submit"
                loading={loading}
                onClick={formik.handleSubmit}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Text
                className={classes.forgotPassword}
                onClick={() => {
                  navigate('/forgot-password');
                }}>
                Forgot password?
              </Text>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() => ({
  form: {
    width: '80%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  forgotPassword: {
    cursor: 'pointer',
    color: '#4c92c6',
    textDecoration: 'underline',
    textAlign: 'center',
  },
  error: {
    textAlign: 'left !important',
    color: 'red !important',
    fontSize: '13px !important',
    fontWeight: '400 !important',
  },
}));
