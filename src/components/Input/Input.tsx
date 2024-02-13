import { FC } from 'react';
import './Input.scss';
import { Controller } from 'react-hook-form';

interface InputProps {
  label: string;
  type?: string;
  control: any;
  name: string;
  rules: object;
  placeholder: string;
  secureTextEntry?: boolean;
}

export const Input: FC<InputProps> = ({
  label,
  type,
  control,
  name,
  rules,
  placeholder,
  secureTextEntry
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <div className='input'>
          {/* <div> */}
          <label className='input__label' htmlFor={name}>{label}</label>
          <div className='input__container'>
            <input
              className='input__container--field'
              type={type}
              value={value}
              onChange={onChange}
              // onBlur={onBlur}
              placeholder={placeholder}
              // secureTextEntry={secureTextEntry}
            />
          </div>
          {error && (
            <div className='input__error'>{error.message || 'Error'}</div>
          )}
        </div>
      )}
    />
  )
};
