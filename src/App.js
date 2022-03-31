import './App.css';
import { ThemeProvider } from '@mui/material';
import theme from './utils/theme';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from './Component/Login'
import Messages from './Component/Messages';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/web-chat/*" element={<Navigate replace to="/web-chat/login" />} />
          <Route path="/web-chat/login" element={<Login />} />
          <Route path="/web-chat/messages" element={<Messages />} />
        </Routes>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
