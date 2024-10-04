import {Backdrop, CircularProgress} from '@mui/material';
import React from 'react';
import TextComponent from '../formElements/TextComponent';
import FileComponent from '../formElements/FileComponent';
import TextfieldComponent from '../formElements/TextfieldComponent';
import TextAreaComponent from '../formElements/TextAreaComponent';
import NumberFieldComponent from '../formElements/NumberFieldComponent';
import SelectComponent from '../formElements/SelectComponent';
import MultiSelectComponent from '../formElements/MultiSelectComponent';
import RadioComponent from '../formElements/RadioComponent';
import CheckListComponent from '../formElements/CheckListComponent';
import CheckBoxComponent from '../formElements/CheckBoxComponent';
import ButtonComponent from '../formElements/ButtonComponent';

function renderComponents(component, formik) {
  const value = component.key?.split('.');
  const shapeValue = value?.length > 1 ? value?.[1] : value?.[0];

  switch (component.type) {
    case 'text':
      return <TextComponent key={shapeValue} text={component.text} />;
    case 'textfield':
      return (
        <TextfieldComponent
          name={shapeValue}
          placeholder={component.label}
          value={formik.values[shapeValue] || ''}
          onChange={formik.handleChange}
          error={formik.errors[shapeValue]}
          required={component?.validate?.required}
          pattern={component?.validate?.pattern}
          validationType={component?.validate?.validationType}
          maxLength={component?.validate?.maxLength}
          minLength={component?.validate?.minLength}
          disabled={component.disabled}
          readonly={component.readonly}
        />
      );

    case 'datetime':
      return (
        <TextfieldComponent
          name={shapeValue}
          placeholder={component.label}
          value={formik.values[shapeValue] || ''}
          onChange={formik.handleChange}
          error={formik.errors[shapeValue]}
          type="date"
          required={component?.validate?.required}
          pattern={component?.validate?.pattern}
          validationType={component?.validate?.validationType}
          maxLength={component?.validate?.maxLength}
          minLength={component?.validate?.minLength}
          disabled={component.disabled}
          readonly={component.readonly}
        />
      );

    case 'textarea':
      return (
        <TextAreaComponent
          name={shapeValue}
          placeholder={component.label}
          value={formik.values[shapeValue] || ''}
          onChange={formik.handleChange}
          error={formik.errors[shapeValue]}
          required={component?.validate?.required}
          pattern={component?.validate?.regularExpressionPattern}
        />
      );

    case 'number':
      return (
        <NumberFieldComponent
          name={shapeValue}
          placeholder={component.label}
          value={formik.values[shapeValue] || ''}
          onChange={formik.handleChange}
          error={formik.errors[shapeValue]}
          required={component?.validate?.required}
        />
      );

    case 'select':
      return (
        <SelectComponent
          name={shapeValue}
          label={component.label}
          values={component.values}
          value={formik.values[shapeValue] || ''}
          onChange={formik}
          error={formik.errors[shapeValue]}
          required={component?.validate?.required}
        />
      );

    case 'taglist':
      return (
        <MultiSelectComponent
          name={shapeValue}
          label={component.label}
          values={component.values}
          value={formik?.values[component?.key] || ''}
          onChange={formik}
          error={formik.errors[shapeValue]}
          required={component?.validate?.required}
        />
      );
    case 'radio':
      return (
        <RadioComponent
          name={shapeValue}
          label={component.label}
          values={component.values}
          value={formik.values[shapeValue] || ''}
          onChange={formik.handleChange}
          error={formik.errors[shapeValue]}
          required={component?.validate?.required}
          defaultValue={component?.defaultValue ? component.defaultValue : ''}
          properties={component?.properties}
        />
      );
    case 'checklist':
      return (
        <CheckListComponent
          name={shapeValue}
          label={component.label}
          values={component.values}
          value={formik.values[shapeValue] || ''}
          onChange={formik.handleChange}
          error={formik.errors[shapeValue]}
          required={component?.validate?.required}
        />
      );
    case 'checkbox':
      return (
        <CheckBoxComponent
          name={shapeValue}
          label={component.label}
          values={component.values}
          value={formik.values[shapeValue] || ''}
          onChange={formik.handleChange}
          error={formik.errors[shapeValue]}
          required={component?.validate?.required}
        />
      );
    case 'button':
      return (
        <ButtonComponent
          key={shapeValue}
          label={component.label}
          // className={component.properties.class}
          onClick={formik.handleSubmit}
        />
      );
    default:
      console.error(`Unknown component type: ${component.type}`);
      return null;
  }
}

function formatLabel(label) {
  const formattedLabel = label.replace(/([a-z])([A-Z])/g, '$1 $2');
  let transformedText = formattedLabel.split('_').join(' ');
  transformedText =
    transformedText.charAt(0).toUpperCase() + transformedText.slice(1);
  return transformedText;
}

export {renderComponents, formatLabel};
