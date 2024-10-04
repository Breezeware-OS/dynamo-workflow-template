import React from 'react';
import Grid from '@mui/material/Grid';
import {Text} from 'glide-design-system';

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

const samplePatientData = {
  'Physician Notes': [
    {
      key: 'cheifComplaint',
      display_name: 'Chief Complaint',
      value: 'phy chief comp',
    },
    {
      key: 'historyOfPresentIllness',
      display_name: 'History of present illness',
      value: 'phy his',
    },
    {
      key: 'assessmentAndPlan',
      display_name: 'Assessment and plan',
      value: 'phy assessment',
    },
  ],
};

export default function RenderPhysicianNotes() {
  return (
    <Grid container spacing={1}>
      <Grid container spacing={3} padding={1}>
        {Object?.keys(samplePatientData).map(key => {
          return (
            <Grid item container xs={12} spacing={3}>
              <Grid item xs={12}>
                <Text type="h2">{key}</Text>
              </Grid>

              <Grid item container xs={12} spacing={3}>
                {samplePatientData[key]?.map(property => {
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
    </Grid>
  );
}
