import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import ContactsPage from './components/ContactsPage';
import { useAppSelector } from './utils/hooks';
import { selectAuthResponseData } from './redux/authSlice';
import './App.css';

function App() {
  const navigate = useNavigate();
  const { accessToken } = useAppSelector(selectAuthResponseData);

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
        <Route path="contacts" element={<ContactsPage />} />
      </Routes>
    </div>
  );
}

export default App;
