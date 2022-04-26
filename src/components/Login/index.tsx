import React, { FormEvent } from 'react';
import { selectAuthErrorData } from '../../redux/authSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

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
    <form onSubmit={onSubmit}>
      <label>
        <b>Email</b>
        <input type="email" name="email" />
        {error === 'Cannot find user' && <strong>{error}</strong>}
      </label>
      <label>
        <b>Password</b>
        <input type="password" name="password" />
        {error === 'Incorrect password' && <strong>{error}</strong>}
      </label>
      <button type="submit">submit</button>
    </form>
  );
}

export default Login;
