import React from 'react';
import { useField } from 'formik';
import { DropdownProps } from '../utils/types';

const DropdownField: React.FC<DropdownProps> = ({
  label,
  name,
  options,
  onChange,
  onBlur,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [field, meta, helpers] = useField<any>(name);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    helpers.setValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    helpers.setTouched(true);
    onBlur && onBlur(e);
  };

  return (
    <div className="inputfield">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={field.value}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      >
        <option value="">Login as...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <p style={{ color: '#b22b27' }}>{meta.error}</p>
      )}
    </div>
  );
};

export default DropdownField;
