import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../../Config/MyFirebase";
import { TextField, Button } from '@mui/material';
import './style.css'

const Reset = () => {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading)
      return;
    if (user)
      navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className='background'>
      <div className='reset'>
        <div className='title'>
          Forgot password
        </div>
        <TextField
          style={{ width: "75%" }}
          label="Email"
          variant="outlined"
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          style={{ width: "25%", margin: "3%" }}
          variant="contained"
          color="error"
          onClick={() => sendPasswordReset(email)}
        >
          Submit
        </Button>
        <div className='back'>
          Back to&nbsp;
          <Link to="/login"> login </Link>
        </div>
      </div>
    </div>
  );
}

export default Reset;