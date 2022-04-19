import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Contacts from './components/Contacts';
import { useEffect } from 'react';
import { useAppSelector } from './utils/hooks';
import { selectResponseData } from './redux/authSlice';
import './App.css';

function App() {
  const navigate = useNavigate();
  const { accessToken } = useAppSelector(selectResponseData);

  useEffect(() => {
    if (!accessToken || accessToken === 'undefined') {
      navigate('/login');
    } else {
      navigate('/contacts');
    }
  }, [accessToken])

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='contacts' element={<Contacts />} />
    </Routes>
  );
}

export default App;
