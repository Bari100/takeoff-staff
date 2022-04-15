import { ChangeEvent, FormEvent } from 'react';
import { selectUser, setUser } from './redux/authSlice';
import { useAppSelector, useAppDispatch } from './app/hooks';
import './App.css';

function App() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { value } = e.target;
    dispatch(
      setUser({
        ...user,
        [name]: value,
      })
    );
  }
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    dispatch({type: 'TOKEN_REQUESTED'})
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input type="email" name="email" onChange={onChange} />
        <input type="password" name="password" onChange={onChange} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
