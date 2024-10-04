/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import {Button, Text} from 'glide-design-system';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {patientForm} from './PatientFormJson';
import renderComponents from './IntakeFormUtils';
import ButtonComponent from '../../components/formElements/ButtonComponent';
import Appbar from '../../components/Appbar/Appbar';
import BackendService from '../../service/BackendService';
import {fetchForm, saveForm} from './FomSlice';

const formatLabel = label => {
  const formattedLabel = label.replace(/([a-z])([A-Z])/g, '$1 $2');
  let transformedText = formattedLabel.split('_').join(' ');
  transformedText =
    transformedText.charAt(0).toUpperCase() + transformedText.slice(1);
  return transformedText;
};

export default function PatientDetailsForm() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  // selectors
  const intakeForm = useSelector(state => state.intakeForm.intakeFormData);

  useEffect(() => {
    dispatch(fetchForm(params?.id));
  }, []);
  const form = intakeForm?.taskForm?.formSchemaAndDataJson || '{}';
  const parsedForm = JSON.parse(form).components;

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
    initialValues: {ratePain: '1'},
    validationSchema,
    onSubmit: async values => {
      if (!values?.language) {
        values.language = 'English';
      }
      const components = parsedForm;
      for (const obj of components) {
        const value = obj.key?.split('.');
        const shapeValue = value?.length > 1 ? value?.[1] : value?.[0];
        const key = obj.key || obj.id; // Get the key from 'key' or 'id' property
        if (values?.hasOwnProperty(shapeValue)) {
          obj.value = values[shapeValue];
        }
      }
      const updatedData = {
        ...intakeForm,
        id: intakeForm?.applicationId,
      };

      updatedData.taskForm = {
        ...updatedData.taskForm,
        formSchemaAndDataJson: JSON.stringify({
          components,
        }),
      };

      const postData = {
        formId: params?.id,
        form: updatedData.taskForm,
      };

      dispatch(saveForm(postData)).then(() => {
        navigate('/feedback');
      });
    },
    validateOnChange: false,
    enableReinitialize: true,
  });

  return (
    <>
      <Appbar />
      <Grid container padding={1}>
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
                    field?.type === 'text' || field?.type === 'checkbox'
                      ? 12
                      : 4
                  }
                  paddingRight="16px"
                  key={field.id}
                  textAlign="center"
                  padding={2}>
                  {renderComponents(field, formik)}
                </Grid>
              ))}
            </Grid>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                marginTop: '14px',
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
                onClick={formik.handleSubmit}
              />
            </div>
          </form>
        </Grid>
      </Grid>
    </>
  );
}
