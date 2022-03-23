import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle
} from '../../Config/MyFirebase';
import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material';
import { Visibility, VisibilityOff, Google } from '@mui/icons-material';
import './style.css';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  return (
    <div className='background'>
      <div className='header'>
        Welcome to NiChat
        <div className='info'>
          developed by Hùng Nguyễn Hoàng Bảo
        </div>
      </div>
      <div className='login'>
        <div className='title'>
          Login
        </div>
        <TextField
          style={{ width: "75%" }}
          label="Email"
          variant="outlined"
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl sx={{ width: "75%" }} variant="outlined" margin="normal">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <div className='forgot'>
          <Link to="/reset">
            Forgot Password?
          </Link>
        </div>
        <Button
          style={{ width: "75%", margin: "5%" }}
          variant="contained"
          color="error"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          login
        </Button>
        <div className='register'>
          Don't have an account? &nbsp;
          <Link to="/register"> Sign-up </Link>
        </div>
        ----- OR -----
        <Button
          style={{ width: "75%", margin: "5%" }}
          variant="outlined"
          color="error"
          onClick={signInWithGoogle}
        >
          login with&nbsp;<Google />oogle
        </Button>
      </div>
    </div>
  );
}

export default Login;