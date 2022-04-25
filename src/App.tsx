import React, { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './components/Login';
import ContactsList from './components/ContactsList';
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
  }, [accessToken, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="contacts" element={<ContactsList />} />
      </Routes>
    </div>
  );
}

export default App;
