/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import React, {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import {Breadcrumbs, Button, Snackbar, Text} from 'glide-design-system';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import HomeIcon from '../../assets/icons/home.svg';
import RenderPatientDetails from '../../components/RenderInformation/RenderPatientDetails';
import {
  formatLabel,
  renderComponents,
} from '../../components/utils/RenderFormUtils';
import ButtonComponent from '../../components/formElements/ButtonComponent';
import {
  fetchScheduleAppointmentData,
  reviewFormSliceActions,
  saveScheduleAppointmentData,
} from '../ReviewFormSlice';

export default function ScheduleAppointment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();

  const scheduleAppointmentFormData = useSelector(
    state => state.reviewForm.scheduleAppointmentData,
  );

  useEffect(() => {
    dispatch(fetchScheduleAppointmentData(id));
  }, []);

  const form =
    scheduleAppointmentFormData?.taskForm?.formSchemaAndDataJson || '{}';
  const parsedForm = JSON.parse(form).components;

  // selectors
  const reviewFormErrorMessage = useSelector(state => state.reviewForm.message);
  const reviewFormNotification = useSelector(
    state => state.reviewForm.notification,
  );
  const reviewFormError = useSelector(state => state.reviewForm.error);

  const validationSchema = Yup.object().shape(
    parsedForm?.reduce((shape, field) => {
      if (field?.validate?.required) {
        const value = field.key?.split('.');
        const shapeValue = value?.length > 1 ? value[1] : value[0];
        formatLabel(shapeValue);
        shape[shapeValue] = Yup.mixed().required(
          `${formatLabel(shapeValue)} is required`,
        );
      }
      return shape;
    }, {}),
  );

  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: async values => {
      const components = parsedForm;
      for (const obj of components) {
        const value = obj.key?.split('.');
        const shapeValue = value?.length > 1 ? value?.[1] : value?.[0];
        if (values?.hasOwnProperty(shapeValue)) {
          obj.value = values[shapeValue];
        }
      }
      const updatedData = {
        ...scheduleAppointmentFormData,
        id: scheduleAppointmentFormData?.applicationId,
      };

      updatedData.taskForm = {
        ...updatedData.taskForm,
        formSchemaAndDataJson: JSON.stringify({
          components,
        }),
      };

      const postData = {
        formId: id,
        form: updatedData.taskForm,
      };

      dispatch(saveScheduleAppointmentData(postData)).then(() => {
        navigate('/');
      });
    },
    validateOnChange: false,
    enableReinitialize: true,
  });
  return (
    <Grid container padding={1} style={{marginTop: '8px'}}>
      {reviewFormNotification && (
        <Snackbar
          id="alert-message"
          style={{zIndex: '1'}}
          open
          message={reviewFormErrorMessage}
          type={reviewFormError ? 'error' : 'success'}
          autoHideDuration={5000}
          onClose={() => dispatch(reviewFormSliceActions.closeNotification())}
        />
      )}
      <Grid item xs={12} marginBottom="8px">
        <Breadcrumbs separator=">">
          <Text href="/" style={{color: ' #aaaaaa'}}>
            <img src={HomeIcon} alt="" style={{marginRight: '3px'}} />
            Home
          </Text>
          <Text href="/" style={{color: ' #aaaaaa'}}>
            Nurse Task
          </Text>
          <Text style={{color: ' #aaaaaa'}}>
            {' '}
            {`${scheduleAppointmentFormData?.contextData?.intakeForm?.entityProperties['General Information'][0]?.value} 
            ${scheduleAppointmentFormData?.contextData?.intakeForm?.entityProperties['General Information'][1]?.value}`}{' '}
          </Text>
        </Breadcrumbs>
      </Grid>

      <Grid item xs={12} marginBottom="8px">
        <Text type="h1">Schedule Patient Appointment</Text>
      </Grid>

      <Grid
        item
        xs={12}
        style={{border: '1px solid #d7d7d7', borderRadius: 5, padding: 8}}>
        <RenderPatientDetails
          patientInfo={
            scheduleAppointmentFormData?.contextData?.intakeForm
              ?.entityProperties['General Information']
          }
        />{' '}
      </Grid>

      <Grid item xs={12} padding={0}>
        <form
          style={{
            width: '100%',
          }}>
          <Grid
            container
            display="flex"
            border="1px solid #d7d7d7"
            borderRadius="5px"
            marginLeft="3px"
            marginTop="10px"
            style={{width: '100%'}}>
            {parsedForm?.map(field => (
              <Grid
                item
                xs={12}
                md={
                  field?.type === 'text' || field?.type === 'checkbox' ? 12 : 4
                }
                paddingRight="16px"
                key={field.id}
                textAlign="center"
                padding={2}>
                {renderComponents(field, formik)}
              </Grid>
            ))}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                margin: '14px',
                width: '100%',
              }}>
              <Button
                onClick={() => navigate('/')}
                color="secondary"
                id="exit-btn">
                Exit
              </Button>
              <ButtonComponent
                key="form-submit"
                label="Submit"
                // className={component.properties.class}
                onClick={formik.handleSubmit}
              />
            </div>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
