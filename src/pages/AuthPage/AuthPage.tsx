import { FC } from 'react';
import './AuthPage.scss';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/Input/Input';

export const AuthPage: FC = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = () => console.log('Done')
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
              secureTextEntry
              rules={{required: 'Email is required'}}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Type password"
              control={control}
              secureTextEntry
              rules={{required: 'Password is required'}}
            />
          </div>

          <div style={{textAlign: 'center'}}>
            <button className='form__button' type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
};
