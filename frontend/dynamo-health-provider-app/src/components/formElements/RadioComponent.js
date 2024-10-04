import {FormControlLabel, Radio, RadioGroup, Typography} from '@mui/material';
import {Text} from 'glide-design-system';
import React from 'react';

export default function RadioComponent({
  name,
  placeholder,
  value,
  onChange,
  error,
  values,
  label,
  required,
  defaultValue,
  properties,
}) {
  return (
    <div>
      <Text style={{textAlign: 'left', marginBottom: 8}}>
        {label} {required && <span style={{color: 'red'}}>*</span>}
      </Text>
      <div style={{width: '100%'}}>
        <RadioGroup
          row
          name={name}
          id="attention"
          onChange={onChange}
          // defaultValue={defaultValue ? defaultValue : ''}
          // defaultChecked={defaultValue}
          // className={classes.radio}
        >
          {values.map(option => (
            <FormControlLabel
              // disabled={properties?.hidden}
              // defaultValue={defaultValue}
              value={option.value}
              control={<Radio />}
              label={option?.label}
              checked={value === option.value}
            />
          ))}
        </RadioGroup>
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
