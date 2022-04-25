import React, { FormEvent } from 'react';
import { useAppDispatch } from '../../utils/hooks';

function Login() {
  const dispatch = useAppDispatch();

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
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button type="submit">submit</button>
    </form>
  );
}

export default Login;
