import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import Login from './Component/Login'
import Reset from './Component/Login/reset';
import Register from './Component/Login/register'
import Profile from './Component/Profile';
import DashBoard from './Component/DashBoard';

// toast.configure();

const App = () => {
  return (
    <BrowserRouter>
      {/* <ToastContainer
        position='top-right'
        autoClose={2000}
      /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
