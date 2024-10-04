import {Typography} from '@mui/material';
import {Text, TextField} from 'glide-design-system';
import React from 'react';

export default function NumberFieldComponent({
  name,
  placeholder,
  value,
  onChange,
  error,
  required,
}) {
  return (
    <div>
      <Text style={{textAlign: 'left', marginBottom: 8}}>
        {placeholder} {required && <span style={{color: 'red'}}>*</span>}
      </Text>
      <TextField
        name={name}
        style={{width: '100%'}}
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
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
