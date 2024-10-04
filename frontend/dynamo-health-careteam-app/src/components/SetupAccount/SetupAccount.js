import {
  Button,
  Card,
  MenuItem,
  Select,
  Text,
  TextField,
} from 'glide-design-system';
import makeStyles from '@mui/styles/makeStyles';
import * as Yup from 'yup';
import {useNavigate, useParams} from 'react-router-dom';
import {useFormik} from 'formik';
import React, {useState} from 'react';

import dynamoLogo from '../../assets/logo/dynamo_logo.png';
import BackendService from '../../service/BackendService';

// SetupAccount schema for error validation
const setupAccountSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required.'),
  lastName: Yup.string().required('Last Name is required.'),
  phoneNumber: Yup.string()
    .required('Phone Number is required.')
    .min(10, 'Enter a valid phone number')
    .max(10, 'Enter a valid phone number'),
  newPassword: Yup.string()
    .required('Password is required.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password is required.')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

/**
 * Setup account page for user.
 * @returns Setup account page.
 */
const SetupAccount = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [responseError, setResponseError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {email} = useParams();
  const [phoneNumberFormat, setPhoneNumberFormat] = useState('+91');

  const formik = useFormik({
    initialValues: {},
    validationSchema: setupAccountSchema,
    onSubmit: async values => {
      // values.phoneNumber = `${phoneNumberFormat}${values.phoneNumber}`;
      values.email = email;
      values.password = values?.newPassword;

      const params = {...values};
      params.phoneNumber = `${phoneNumberFormat}${values.phoneNumber}`;
      // setLoading(true);
      handleSetUpAccount(params);
    },
    validateOnChange: false,
    enableReinitialize: true,
  });

  /**
   * When user submits API call is made.
   * Navigate to login page if success or update error.
   * @param {*} values - user data.
   */
  const handleSetUpAccount = values => {
    BackendService.accountSetup(values)
      .then(res => {
        setLoading(false);
        navigate('/');
        setResponseError(null);
      })
      .catch(err => {
        setLoading(false);
        setResponseError(err?.response?.data?.details[0]);
      });
  };

  /**
   * Handles phone number field by restricting strings and max length.
   * @param {*} event phone number field
   * @returns null
   */
  const handlePhoneNumberKeyPress = event => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);

    // Allow only numbers (digits) and backspace
    const numericRegex = /^[0-9\b]+$/;

    if (
      event.target.value?.startsWith('+91') ||
      event.target.value?.startsWith(' 91')
    ) {
      if (event.target.value.length >= 13 && event.key !== 'Backspace') {
        event.preventDefault();
        return;
      }
    } else if (event.target.value.length >= 10 && event.key !== 'Backspace') {
      event.preventDefault();
      return;
    }

    if (!numericRegex.test(keyValue)) {
      event.preventDefault();
    }
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <img src={dynamoLogo} alt="" />
        <Text type="h2">Setup your new account</Text>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <div style={{width: '100%', paddingInline: 5}}>
            <Text className={classes.inputLabel}>
              First Name <span style={{color: 'red'}}>*</span>
            </Text>
            <TextField
              id="firstName"
              placeholder="First Name"
              name="firstName"
              style={{width: '100%', color: 'black'}}
              onChange={formik.handleChange}
            />
            {formik.errors?.firstName && (
              <Text className={classes.error}>{formik.errors?.firstName}</Text>
            )}
          </div>
          <div style={{width: '100%', paddingInline: 5}}>
            <Text className={classes.inputLabel}>
              Last Name <span style={{color: 'red'}}>*</span>
            </Text>
            <TextField
              id="lastName"
              placeholder="Last Name"
              name="lastName"
              style={{width: '100%', color: 'black'}}
              onChange={formik.handleChange}
            />
            {formik.errors?.lastName && (
              <Text className={classes.error}>{formik.errors?.lastName}</Text>
            )}
          </div>

          <div style={{width: '100%', paddingInline: 5}}>
            <Text className={classes.inputLabel}>
              Phone Number <span style={{color: 'red'}}>*</span>
            </Text>
            <div style={{display: 'flex'}}>
              <Select
                value={phoneNumberFormat}
                onChange={value => setPhoneNumberFormat(value)}
                style={{
                  width: '15%',
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px',
                  height: '40px',
                }}>
                <MenuItem value="+91">+91</MenuItem>
                <MenuItem value="+1">+1</MenuItem>
              </Select>
              <TextField
                value={formik.values.phoneNumber}
                id="phoneNumber"
                placeholder="Phone number"
                className={classes.textField}
                size="large"
                type="text"
                name="phoneNumber"
                onChange={formik.handleChange}
                style={{
                  width: '100%',
                  color: 'black',
                  borderTopLeftRadius: '0px',
                  borderBottomLeftRadius: '0px',
                  borderLeft: '0px',
                }}
              />
            </div>

            {formik.errors?.phoneNumber && (
              <Text className={classes.error}>
                {formik.errors?.phoneNumber}
              </Text>
            )}
          </div>
          <div style={{width: '100%', paddingInline: 5}}>
            <Text className={classes.inputLabel}>
              New Password <span style={{color: 'red'}}>*</span>
            </Text>
            <TextField
              iconPosition="end"
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
              Confirm Password <span style={{color: 'red'}}>*</span>
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
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SetupAccount;

const useStyles = makeStyles(theme => ({
  error: {
    textAlign: 'left !important',
    color: 'red !important',
    fontSize: '13px !important',
    fontWeight: '400 !important',
  },
  notchedOutline: {
    borderWidth: '1px !important',
    borderColor: '#d7d7d7 !important',
    color: '#333333 !important',
  },
  floatingLabelFocusStyle: {
    color: '#333333 !important',
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
}));
