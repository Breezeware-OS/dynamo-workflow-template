import {Button, Card, Text, TextField} from 'glide-design-system';
import {Auth} from 'aws-amplify';
import makeStyles from '@mui/styles/makeStyles';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import React, {useState} from 'react';

// Forgot password schema to validate error handling
const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email field required.')
    .email('Enter valid email.'),
});

/**
 * Handles Forgot password of the user.
 * @returns Forgot password page
 */
const ForgotPassword = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [responseError, setResponseError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {},
    validationSchema: forgotPasswordSchema,
    onSubmit: async values => {
      setLoading(true);
      handleForgotPassword(values);
    },
    validateOnChange: false,
    enableReinitialize: true,
  });

  /**
   * When user submits API call is made using aws-amplify
   * Navigate to reset pasword if success or update error
   * @param {*} values - user email
   */
  const handleForgotPassword = values => {
    Auth.forgotPassword(values?.email)
      .then(res => {
        setLoading(false);
        setResponseError(null);
        navigate(`/reset-password/${values?.email}`);
      })
      .catch(err => {
        setLoading(false);
        setResponseError(err?.message);
      });
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <Text type="h2">Forgot Password</Text>
        <Text className={classes.info}>
          Please enter the email address associated with your account.
        </Text>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <div style={{width: '100%', paddingInline: 5}}>
            <Text className={classes.inputLabel}>
              Email <span style={{color: 'red'}}>*</span>
            </Text>
            <TextField
              id="email"
              placeholder="Email"
              name="email"
              style={{width: '100%', color: 'black', marginTop: 8}}
              onChange={formik.handleChange}
            />
            {formik.errors?.email && (
              <Text className={classes.error}>{formik.errors?.email}</Text>
            )}
          </div>
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
          <div
            style={{
              width: '100%',
              display: 'flex',
              gap: '15px',
              flexDirection: 'column',
              paddingInline: 5,
            }}>
            <Button
              style={{width: '100%'}}
              type="submit"
              loading={loading}
              onClick={formik.handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;

const useStyles = makeStyles(() => ({
  error: {
    textAlign: 'left !important',
    color: 'red !important',
    fontSize: '13px !important',
    fontWeight: '400 !important',
  },
  inputLabel: {
    fontSize: '14px !important',
    fontWeight: '400 !important',
  },
  card: {
    display: 'flex !important',
    justifyContent: 'center !important',
    flexDirection: 'column !important',
    alignItems: 'center !important',
    gap: '15px !important',
    width: '487px !important',
  },
  container: {
    display: 'flex !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    height: '100vh !important',
    padding: '5 !important',
  },
  form: {
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  info: {
    fontSize: '16px !important',
    fontWeight: '400 !important',
    textAlign: 'center !important',
  },
}));
