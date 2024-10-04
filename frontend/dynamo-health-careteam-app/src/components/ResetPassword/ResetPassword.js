import {Button, Card, Text, TextField} from 'glide-design-system';
import {Auth} from 'aws-amplify';
import makeStyles from '@mui/styles/makeStyles';
import * as Yup from 'yup';
import {useNavigate, useParams} from 'react-router-dom';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {Alert, Snackbar} from '@mui/material';

// REset password schema for error validation
const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('Password field required.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password field required.')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  verificationCode: Yup.string().required('Verification field required.'),
});

/**
 * Reset Password page using aws amplify API.
 * @returns Reset password page.
 */
const ResetPassword = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const {email} = useParams();
  const [responseError, setResponseError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();
  const [notification, setNotification] = useState(false);
  const [severity, setSeverity] = useState('');

  const formik = useFormik({
    initialValues: {},
    validationSchema: resetPasswordSchema,
    onSubmit: async values => {
      setLoading(true);
      handleResetPassword(values);
    },
    validateOnChange: false,
    enableReinitialize: true,
  });

  /**
   * When user submits API call is made using aws-amplify.
   * Email is sent with code and navigated to login page if success or error is updated.
   * @param {*} values - user email,code,password
   */
  const handleResetPassword = values => {
    Auth.forgotPasswordSubmit(
      email,
      values?.verificationCode,
      values?.newPassword,
    )
      .then(res => {
        setLoading(false);
        setResponseError(null);
        navigate('/');
      })
      .catch(err => {
        setLoading(false);
        setResponseError(err?.message);
      });
  };

  /**
   * Code will be sent to the given email.
   */
  const resendCode = () => {
    Auth.forgotPassword(email)
      .then(res => {
        setNotificationMessage('Code sent Successfully.');
        setNotification(true);
        setSeverity('success');
      })
      .catch(err => {
        setNotificationMessage(err?.message);
        setNotification(true);
        setSeverity('error');
      });
  };

  return (
    <>
      <Snackbar
        autoHideDuration={1000}
        id="snackbar"
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={notification}
        onClose={() => setNotification(false)}>
        <Alert
          id="alert"
          onClose={() => setNotification(false)}
          severity={severity}>
          {notificationMessage}
        </Alert>
      </Snackbar>

      <div className={classes.container}>
        <Card className={classes.card}>
          <Text style={{fontSize: '18px'}}>Reset Password</Text>
          <Text className={classes.info}>
            Please provide the verification code along with your new password
            and confirmation to reset your password.
          </Text>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <div style={{width: '100%', paddingInline: 5}}>
              <Text className={classes.inputLabel}>
                Verification Code <span style={{color: 'red'}}>*</span>
              </Text>
              <TextField
                id="code"
                placeholder="Verification Code"
                name="verificationCode"
                style={{width: '100%', color: 'black'}}
                onChange={formik.handleChange}
              />
              {formik.errors?.verificationCode && (
                <Text className={classes.error}>
                  {formik.errors?.verificationCode}
                </Text>
              )}
            </div>
            <div style={{width: '100%', paddingInline: 5}}>
              <Text className={classes.inputLabel}>
                New Password<span style={{color: 'red'}}>*</span>
              </Text>
              <TextField
                id="new-password"
                placeholder="New Password"
                name="newPassword"
                type="password"
                style={{width: '100%', color: 'black'}}
                onChange={formik.handleChange}
              />
              {formik.errors?.newPassword && (
                <Text className={classes.error}>
                  {formik.errors?.newPassword}
                </Text>
              )}
            </div>

            <div style={{width: '100%', paddingInline: 5}}>
              <Text className={classes.inputLabel}>
                Confirm Password<span style={{color: 'red'}}>*</span>
              </Text>
              <TextField
                id="confirm-password"
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                style={{width: '100%', color: 'black'}}
                onChange={formik.handleChange}
              />
              {formik.errors?.confirmPassword && (
                <Text className={classes.error}>
                  {formik.errors?.confirmPassword}
                </Text>
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
              <Text
                onClick={resendCode}
                style={{
                  color: ' #0a5b99',
                  fontSize: '18px',
                  fontWeight: '700',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}>
                RESEND CODE
              </Text>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ResetPassword;

const useStyles = makeStyles(theme => ({
  error: {
    textAlign: 'left !important',
    color: 'red !important',
    fontSize: '13px !important',
    fontWeight: '400 !important',
  },

  inputLabel: {
    fontSize: '14px',
    fontWeight: '400 !important',
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    width: '487px',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: 5,
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
