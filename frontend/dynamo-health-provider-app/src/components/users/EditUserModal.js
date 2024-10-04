import React from 'react';
import {
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Radio,
  RadioGroup,
  FormGroup,
  Checkbox,
  TextField as Input,
} from '@mui/material';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  Text,
  TextField,
} from 'glide-design-system';
import CloseIcon from '@mui/icons-material/Close';
import {useAuthenticator} from '@aws-amplify/ui-react';
import {useDispatch, useSelector} from 'react-redux';
import makeStyles from '@mui/styles/makeStyles';

export default function EditUserModal({
  open,
  closeModal,
  initialData,
  editUser,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const aciveUserSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email field required.')
      .email('Enter valid email.'),
    roles: Yup.array()
      .of(Yup.string().required('Role is required'))
      .required('Role is required'),
    groups: Yup.array()
      .of(Yup.string().required('Group is required'))
      .required('Group is required'),

    firstName: Yup.string().required('Firstname field required.'),
    lastName: Yup.string().required('Lastname field required.'),
    phoneNumber: Yup.string().required('Phone Number field required.'),
  });

  const inviteUserSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email field required.')
      .email('Enter valid email.'),
    roles: Yup.array()
      .of(Yup.string().required('Role is required'))
      .required('Role is required'),
    groups: Yup.array()
      .of(Yup.string().required('Group is required'))
      .required('Group is required'),
  });

  const formik = useFormik({
    initialValues: {...initialData},
    validationSchema:
      initialData?.status === 'invited' ? inviteUserSchema : aciveUserSchema,
    onSubmit: async values => {
      if (!values.phoneNumber) {
        // Handle the case where phoneNumber is not defined
      } else if (values.phoneNumber.startsWith('+91')) {
        // The phoneNumber starts with '+91', no change is needed
      } else if (values.phoneNumber.startsWith('+1')) {
        // The phoneNumber starts with '+1', no change is needed
      } else {
        // The phoneNumber doesn't start with either '+1' or '+91', so add a default prefix
        values.phoneNumber = `+91${values.phoneNumber}`;
      }

      editUser(values);
    },
    validateOnChange: false,
    enableReinitialize: true,
  });

  const handlePhoneNumberKeyPress = event => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);

    // Allow only numbers (digits) and backspace
    const numericRegex = /^[0-9\b]+$/;

    // Limit the input to only five characters
    if (
      event.target.value?.startsWith('+91') ||
      event.target.value?.startsWith('+1')
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
  const groupChangeHandler = e => {
    let groups = formik.values.groups ? [...formik.values.groups] : [];

    if (e.target.checked) {
      groups.push(e.target.value);
    } else {
      groups = groups.filter(prevValue => e.target.value !== prevValue);
    }

    formik.setFieldValue('groups', groups);
  };

  return (
    <Modal open={open} onClose={closeModal} style={{width: '924px'}} id="modal">
      <form onSubmit={formik.handleSubmit}>
        <ModalTitle
          id="modal-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '16px',
          }}>
          <Text type="h2">Edit User</Text>
          <IconButton id="close-icon" onClick={closeModal} style={{padding: 0}}>
            <CloseIcon />
          </IconButton>
        </ModalTitle>
        <ModalContent style={{padding: '16px'}} id="modal-content">
          <Grid container spacing="16px" display="flex" flexDirection="row">
            {initialData?.status !== 'invited' ? (
              <>
                <Grid item xs={12} md={6}>
                  <InputLabel>
                    Firstname <span style={{color: 'red'}}>*</span>
                  </InputLabel>
                  <TextField
                    id="first-name"
                    placeholder="Firstname"
                    name="firstName"
                    size="large"
                    width="100%"
                    value={formik.values?.firstName}
                    onChange={formik.handleChange}
                    style={{color: 'black'}}
                  />
                  {formik.errors?.firstName && (
                    <Text className={classes.error}>
                      {formik.errors?.firstName}
                    </Text>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel>
                    Lastname <span style={{color: 'red'}}>*</span>
                  </InputLabel>
                  <TextField
                    placeholder="Lastname"
                    id="last-name"
                    name="lastName"
                    size="large"
                    width="100%"
                    value={formik.values?.lastName}
                    onChange={formik.handleChange}
                    style={{color: 'black'}}
                  />
                  {formik.errors?.lastName && (
                    <Text className={classes.error}>
                      {formik.errors?.lastName}
                    </Text>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel>
                    Phone number <span style={{color: 'red'}}>*</span>
                  </InputLabel>
                  <Input
                    id="phoneNumber"
                    placeholder="Phone number"
                    className={classes.textField}
                    size="small"
                    type="text"
                    name="phoneNumber"
                    onChange={formik.handleChange}
                    sx={{width: '100%'}}
                    InputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      maxLength: 15,
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                    value={formik.values?.phoneNumber}
                    InputLabelProps={{
                      className: classes.floatingLabelFocusStyle,
                    }}
                    onKeyPress={handlePhoneNumberKeyPress}
                  />
                  {formik.errors?.phoneNumber && (
                    <Text className={classes.error}>
                      {formik.errors?.phoneNumber}
                    </Text>
                  )}
                </Grid>
              </>
            ) : (
              <></>
            )}

            <Grid item xs={12} md={initialData?.status !== 'invited' ? 6 : 0}>
              <InputLabel style={{marginBottom: 5}}>
                Email Address <span style={{color: 'red'}}>*</span>
              </InputLabel>
              <TextField
                placeholder="Email Address"
                name="email"
                id="email"
                value={formik.values?.email}
                size="large"
                style={{color: 'black'}}
                width="100%"
                onChange={formik.handleChange}
              />
              {formik.errors?.email && (
                <Text className={classes.error}>{formik.errors?.email}</Text>
              )}
            </Grid>

            <Grid
              item
              xs={12}
              md={initialData?.status !== 'invited' ? 6 : 0}
              style={{paddingTop: 5, paddingBottom: 0}}>
              {/* Add marginTop and marginBottom here */}
              <InputLabel>
                Groups <span style={{color: 'red'}}>*</span>
              </InputLabel>
              <FormGroup
                row
                name="groups"
                id="groups"
                onChange={groupChangeHandler}
                className={classes.checkbox}>
                <FormControlLabel
                  value="clinical"
                  control={<Checkbox disabled />}
                  label="Clinical"
                  checked={
                    !!formik?.values?.groups?.some(
                      value => value === 'clinical',
                    )
                  }
                />
              </FormGroup>

              {formik.errors?.groups && (
                <Text className={classes.error}>{formik.errors?.groups}</Text>
              )}

              {/* Remove the extra <Grid /> */}
            </Grid>

            <Grid
              item
              xs={12}
              md={initialData?.status !== 'invited' ? 6 : 0}
              style={{paddingTop: 5, paddingBottom: 0}}>
              {/* Add marginTop and marginBottom here */}
              <InputLabel>
                Role <span style={{color: 'red'}}>*</span>
              </InputLabel>
              <RadioGroup
                row
                name="roles"
                id="roles"
                value={formik?.values?.roles}
                onChange={e => formik.setFieldValue('roles', [e.target.value])}>
                <FormControlLabel
                  value="careteam"
                  control={<Radio />}
                  label="Careteam"
                  id="careteam"
                />
                <FormControlLabel
                  value="physician"
                  control={<Radio />}
                  label="Physician"
                  id="physician"
                />
              </RadioGroup>
              {formik.errors?.roles && (
                <Text className={classes.error}>{formik.errors?.roles}</Text>
              )}
            </Grid>
          </Grid>
        </ModalContent>
        <Divider />
        <ModalActions style={{padding: '16px'}}>
          <Button
            icon={<span className="material-symbols-outlined">close</span>}
            iconPosition="start"
            color="secondary"
            onClick={closeModal}
            id="cancel-btn"
            style={{marginRight: '15px'}}>
            Cancel
          </Button>
          <Button
            icon={<span className="material-symbols-outlined">done</span>}
            iconPosition="start"
            type="submit"
            id="submit-btn"
            onClick={formik.handleSubmit}>
            Confirm
          </Button>
        </ModalActions>
      </form>
    </Modal>
  );
}

const useStyles = makeStyles(() => ({
  error: {
    textAlign: 'left !important',
    color: 'red !important',
    fontSize: '13px !important',
    fontFamily: 'Roboto,sans-serif !important',
  },
  notchedOutline: {
    borderWidth: '1px !important',
    borderColor: '#d7d7d7 !important',
    color: '#333333 !important',
  },
  floatingLabelFocusStyle: {
    color: '#333333 !important',
  },
}));
