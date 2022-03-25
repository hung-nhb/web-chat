import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, registerWithEmailAndPassword, } from '../../Config/MyFirebase';
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './style.css'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name)
      alert("Please enter name!");
    else
      registerWithEmailAndPassword(name, email, password);
  }

  useEffect(() => {
    if (loading)
      return;
    if (user)
      navigate("/messages", { replace: true });
    // eslint-disable-next-line
  }, [user, loading]);

  return (
    <div className="background">
      <div className="signup">
        <div className="title">
          Sign-up
        </div>
        <TextField
          style={{ width: "75%" }}
          label="Full Name"
          variant="outlined"
          margin="normal"
          autoComplete='off'
          onChange={(e) => setName(e.target.value)}
        />
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
        <Button
          style={{ width: "25%", margin: "3%" }}
          variant="contained"
          color="error"
          onClick={register}
        >
          Register
        </Button>
        <div className="back">
          Already have an account?&nbsp;<Link to="/login">Login</Link>&nbsp;now
        </div>
      </div>
    </div>
  );
}

export default Register;