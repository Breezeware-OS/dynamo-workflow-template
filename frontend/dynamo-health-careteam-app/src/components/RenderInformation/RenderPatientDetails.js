import React from 'react';
import Grid from '@mui/material/Grid';
import {Text} from 'glide-design-system';

const sampleData = {
  name: 'John Doe',
  gender: 'Male',
  dateOfBirth: '2018-09-01 09:01:15.0',
  language: 'English',
};
const formatTimestampToDateString = timestamp => {
  const dateObj = new Date(timestamp);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = monthNames[dateObj.getMonth()];
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  return `${month} ${day} ${year}`;
};

export default function RenderPatientDetails({patientInfo}) {
  return (
    <Grid container spacing={3} padding={1}>
      <Grid item xs={12}>
        <Text type="h2">Patient Information</Text>
      </Grid>
      {patientInfo?.map(detail => {
        return (
          <Grid item xs={12} md={4}>
            <Grid item xs={12} md={4}>
              <Text style={{fontSize: '14px', marginBottom: '6px'}}>
                {detail?.display_name}
              </Text>
              <Text style={{fontSize: '16px'}}>{detail.value}</Text>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
