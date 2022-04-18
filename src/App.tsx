import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Contacts from './components/Contacts';
import './App.css';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  
  useEffect(() => {
    if (!token || token === 'undefined') {
      navigate('/login');
    } else {
      navigate('/contacts');
    }
  }, [token])

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='contacts' element={<Contacts />} />
    </Routes>
  );
}

export default App;
