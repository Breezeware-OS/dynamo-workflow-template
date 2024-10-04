import {Typography} from '@mui/material';
import {Text, TextField} from 'glide-design-system';
import React from 'react';

export default function TextfieldComponent({
  name,
  placeholder,
  value,
  onChange,
  error,
  required,
  pattern,
  validationType,
  maxLength,
  minLength,
  disabled,
  readonly,
  type,
}) {
  return (
    <div>
      <Text style={{textAlign: 'left', marginBottom: 8}}>
        {placeholder} {required && <span style={{color: 'red'}}>*</span>}
      </Text>
      <TextField
        name={name}
        style={{width: '100%'}}
        pattern={pattern}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readonly={readonly}
        maxLength={maxLength}
        minLength={minLength}
        disabled={disabled}
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
