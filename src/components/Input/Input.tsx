import { FC } from 'react';
import './Input.scss';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';

interface InputProps {
  label: string;
  type?: string;
  control: any;
  name: string;
  rules: object;
  placeholder?: string;
  // secureTextEntry?: boolean;
}

export const Input: FC<InputProps> = ({
  label,
  type,
  control,
  name,
  rules,
  placeholder,
  // secureTextEntry
}) => {
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
