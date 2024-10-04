import {Checkbox, FormControlLabel, FormGroup, Typography} from '@mui/material';
import {Text} from 'glide-design-system';
import React from 'react';

export default function CheckListComponent({
  name,
  placeholder,
  value,
  onChange,
  error,
  values,
  label,
  required,
}) {
  return (
    <div style={{width: '450px'}}>
      <Text style={{textAlign: 'left', marginBottom: 8}}>
        {label} {required && <span style={{color: 'red'}}>*</span>}
      </Text>
      <div style={{width: '100%'}}>
        <FormGroup
          row
          name={name}
          id="check"
          onChange={onChange}
          // className={classes.radio}
        >
          {values.map(option => (
            <FormControlLabel
              value={option.value}
              name={name}
              control={<Checkbox />}
              label={option?.label}
              checked={value.indexOf(option.value) > -1}
            />
          ))}
        </FormGroup>
      </div>
      {error && (
        <Text
          style={{
            color: 'red',
            textAlign: 'left',
            textTransform: 'capitalize',
            marginTop: 8,
          }}>
          {error}
        </Text>
      )}
    </div>
  );
}
