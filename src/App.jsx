import HomePage from './Pages/HomePage';
import MovieDetails from './Pages/MovieDetails';
import Login from './Pages/Login';
import Register from './Pages/Register';
import SeatSelection from './Pages/SeatSelection';
import PaymentPage from './Pages/PaymentPage';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BookingInfo from './Pages/BookingInfo';
import AdminDashboard from './Pages/AdminDashboard';
import CreateTheaterPage from './Pages/CreateTheaterPage';
import UpdateTheaterPage from './Pages/UpdateTheaterPage';
const App = () => {
  const [token, setToken] = useState('');
  return (
    <div>

      <div>
        <ToastContainer />
      </div>

    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path='/movie/:id/seat' element={<SeatSelection />} />
        <Route path="/movie/:id/payment" element={<PaymentPage />} />
        <Route path='/login' element={<Login />} setToken  />
        <Route path='/register' element={<Register />} />
        <Route path="/bookings" element={<BookingInfo />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/createtheater" element={<CreateTheaterPage />} />
        <Route path="/admin/updatetheater" element={<UpdateTheaterPage />} />
        
      </Routes>
    
    </BrowserRouter>

   </div> 
  );
};

export default App;