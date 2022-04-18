import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { selectResponseData, selectUser, setUser } from "../../redux/authSlice";

function Login() {
  const navigate = useNavigate();
	const responseData = useAppSelector(selectResponseData);
  const { accessToken } = responseData;
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

  if (accessToken) {
    localStorage.setItem('token', accessToken);
    navigate('/contacts');
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
