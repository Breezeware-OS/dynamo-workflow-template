import React, {useState} from 'react';
import TextComponent from '../../components/formElements/TextComponent';
import TextfieldComponent from '../../components/formElements/TextfieldComponent';
import TextAreaComponent from '../../components/formElements/TextAreaComponent';
import NumberFieldComponent from '../../components/formElements/NumberFieldComponent';
import SelectComponent from '../../components/formElements/SelectComponent';
import MultiSelectComponent from '../../components/formElements/MultiSelectComponent';
import RadioComponent from '../../components/formElements/RadioComponent';
import CheckListComponent from '../../components/formElements/CheckListComponent';
import CheckBoxComponent from '../../components/formElements/CheckBoxComponent';
import ButtonComponent from '../../components/formElements/ButtonComponent';

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
          placeholder={component.dateLabel}
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

export default renderComponents;
