import React from 'react';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
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
import {
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Radio,
  RadioGroup,
  Typography,
  FormGroup,
  Checkbox,
  TextField as Input,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import CloseIcon from '@mui/icons-material/Close';

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

const initialInviteUserValues = {
  email: null,
  roles: null,
  groups: ['clinical'],
};

export default function InviteUserModal({open, showModal, inviteUserHandler}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {...initialInviteUserValues},
    validationSchema: inviteUserSchema,
    onSubmit: async values => {
      // showModal();
      inviteUserHandler(values);
    },
    validateOnChange: false,
    enableReinitialize: true,
  });

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
    <Modal
      id="modal"
      open={open}
      onClose={() => {
        showModal(false);
        formik.resetForm();
      }}
      style={{width: '600px'}}>
      <form onSubmit={formik.handleSubmit}>
        <ModalTitle
          id="modal-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '16px',
          }}>
          <Text type="h2">Add User</Text>
          <IconButton
            id="close-icon"
            style={{padding: 0}}
            onClick={() => {
              showModal(false);
              formik.resetForm();
            }}>
            <CloseIcon />
          </IconButton>
        </ModalTitle>
        <ModalContent style={{padding: '16px'}} id="modal-content">
          <Grid
            container
            rowGap={1}
            spacing={1} // This spacing property will add space between Grid items
            display="flex"
            flexDirection="row">
            <Grid item xs={12}>
              <InputLabel style={{marginBottom: 5}}>
                Email Address <span style={{color: 'red'}}>*</span>
              </InputLabel>
              <TextField
                placeholder="Email Address"
                name="email"
                id="email"
                size="large"
                style={{color: 'black'}}
                width="100%"
                onChange={formik.handleChange}
              />
              {formik.errors?.email && (
                <Text className={classes.error}>{formik.errors?.email}</Text>
              )}
            </Grid>

            <Grid item xs={12} style={{paddingTop: 0, paddingBottom: 0}}>
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

            <Grid item xs={12} style={{paddingTop: 0, paddingBottom: 0}}>
              {/* Add marginTop and marginBottom here */}
              <InputLabel>
                Role <span style={{color: 'red'}}>*</span>
              </InputLabel>
              <RadioGroup
                row
                name="roles"
                id="roles"
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
            id="cancel-btn"
            onClick={() => {
              showModal(false);
              formik.resetForm();
            }}
            style={{marginRight: '15px'}}>
            Cancel
          </Button>
          <Button
            icon={<span className="material-symbols-outlined">done</span>}
            iconPosition="start"
            type="submit"
            id="submit-btn">
            Confirm
          </Button>
        </ModalActions>
      </form>
    </Modal>
  );
}

const useStyles = makeStyles(theme => ({
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
