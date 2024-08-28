import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import Medicament from './Pages/medicament/medicament';
import Log from './Pages/login/Log';
import Sign from './Pages/sign/Sign';
import Home from './Pages/home/Home';
import Navbar from './components/navbar/Navbar';
import ContaUs from './Pages/contact/ContaUs';
import User from './Pages/users/User';
const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

// This component handles conditional rendering of Navbar
const AppRoutes = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/sign';

  return (
    <>
      {!isAuthPage && <Navbar />}
      <div className='container'>
        <Routes>
        <Route path="*" element={<ContaUs />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/login" element={<Log />} />
          <Route path="/medicament" element={<Medicament />} />
          <Route path="/contact" element={<ContaUs />} />
          <Route  path="/users" element={<User />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
