import { FormEvent } from "react";
import { useAppDispatch } from "../../utils/hooks";
import { setUser } from "../../redux/authSlice";

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

    dispatch(
      setUser({
        email,
        password
      })
    );
    dispatch({type: 'LOGIN'});
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default Login;
