import {Checkbox, FormControlLabel, FormGroup, Typography} from '@mui/material';
import {Text} from 'glide-design-system';
import React from 'react';

export default function CheckBoxComponent({
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
    <div style={{width: '100%'}}>
      {/* <Text style={{textAlign: 'left'}}>
        {label} {required && <span style={{color: 'red'}}>*</span>}
      </Text> */}
      <div style={{width: '100%'}}>
        <FormGroup
          row
          name={name}
          id="check"
          onChange={onChange}
          // className={classes.radio}
        >
          {/* {values.map((option) => ( */}
          <FormControlLabel
            value={value}
            name={name}
            control={<Checkbox />}
            label={label}
            checked={value}
          />
          {/* ))} */}
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
