import React from 'react';
import Grid from '@mui/material/Grid';
import {Text} from 'glide-design-system';

import {samplePatientData} from './SampleData';

const transformText = text => {
  const splitArray = text.split('_');
  const updatedText = [];
  splitArray.map(element => {
    const firstLetter = element.charAt(0).toUpperCase();
    const rest = element.slice(1).toLowerCase();

    updatedText.push(firstLetter + rest);
  });

  return updatedText.join(' ');
};

export default function RenderPatientData({patientData, viewData}) {
  let formData;
  if (patientData) {
    formData = patientData?.contextData?.intakeForm?.entityProperties || {};
  }

  if (viewData) {
    formData = viewData?.intakeForm || {};
  }

  return (
    <Grid container spacing={3}>
      {Object?.keys(formData).map(key => {
        return (
          <Grid item container xs={12} spacing={3}>
            <Grid item xs={12}>
              <Text type="h2">{key}</Text>
            </Grid>

            <Grid item container xs={12} spacing={3}>
              {formData[key]?.map(property => {
                return (
                  <Grid item xs={12} md={4}>
                    <Text style={{fontSize: '14px', marginBottom: '6px'}}>
                      {property.display_name}
                    </Text>
                    <Text style={{fontSize: '16px'}}>
                      {property.value?.includes('_')
                        ? transformText(property.value)
                        : property.value}
                    </Text>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
