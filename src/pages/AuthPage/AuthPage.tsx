import { FC } from 'react';
import './AuthPage.scss';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/Input/Input';
import { emailValidation, passwordValidation } from './validation';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { loginUser } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

interface AuthData {
  email: string;
  password: string;
}

export const AuthPage: FC = () => {
  const { control, handleSubmit, resetField } = useForm<AuthData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {error} = useAppSelector(state => state.user);

  const onSubmit = (data: AuthData) => {
    dispatch(loginUser(data)).then((result) => {
      if (result.payload) {
        resetField('email');
        resetField('password');
        navigate('/products')
      }
    })
  };

  return (
    <div className='page'>
      <div className='form'>
        <div className='form__title'>Login</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form__inputs'>
            <Input
              label="Email"
              name="email"
              placeholder="Type email"
              control={control}
              rules={emailValidation}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Type password"
              control={control}
              rules={passwordValidation}
            />
          </div>

          {error && (
            <div className='form__error'>{error}</div>
          )}

          <div style={{textAlign: 'center'}}>
            <button className='form__button' type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
};
