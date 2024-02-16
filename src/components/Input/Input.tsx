import './Input.scss';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import React from 'react';

interface InputProps {
  label?: string;
  type?: string;
  control: any;
  name: string;
  rules?: object;
  placeholder?: string;
}

export const Input = React.forwardRef(
  (
    {
      label,
      type,
      control,
      name,
      rules,
      placeholder
    }: InputProps,
    ref: any
  ) => {
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <div className='input'>
            <label className='input__label' htmlFor={name}>
              {label}
            </label>
            <div className={classNames(
                'input__container',
                {'input__container--error': error}
              )}
            >
              <input
                className='input__container--field'
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                ref={ref}
              />
            </div>
            {error && (
              <div className='input__error'>{error.message || 'Error'}</div>
            )}
          </div>
        )}
      />
    )
  }
);
