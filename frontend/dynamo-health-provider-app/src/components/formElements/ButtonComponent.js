import {Button} from 'glide-design-system';
import React from 'react';

export default function ButtonComponent({
  name,
  placeholder,
  value,
  onChange,
  error,
  values,
  onClick,
  className,
  label,
  type
}) {
  return (
    <Button type={type} onClick={onClick} className={className}>
      {label}
    </Button>
  );
}
