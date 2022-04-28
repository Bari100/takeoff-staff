import React, { FormEvent } from 'react';
import { selectAuthErrorData } from '../../redux/authSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import css from './Login.module.scss';

function Login() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAuthErrorData);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    const user = {
      email,
      password,
    };
    dispatch({ type: 'LOGIN', user });
  };

  return (
    <form onSubmit={onSubmit} className={css.form}>
      <div className={css.inputs}>
        <label className={css.labelBlock}>
          <b className={css.label}>Email</b>
          <input type="email" name="email" className={css.input} />
          {error === 'Cannot find user' && <strong className={css.errorMessage}>{error}</strong>}
        </label>
        <label className={css.labelBlock}>
          <b className={css.label}>Password</b>
          <input type="password" name="password" className={css.input} />
          {error === 'Incorrect password' && <strong>{error}</strong>}
        </label>
      </div>
      <button type="submit" className={css.submitButton}>submit</button>
    </form>
  );
}

export default Login;
