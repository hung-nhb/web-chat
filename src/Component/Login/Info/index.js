import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  logInWithEmailAndPassword,
  signInWithGoogle
} from '../../../Config/MyFirebase';
import {
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button
} from '@mui/material';
import { Visibility, VisibilityOff, Google } from '@mui/icons-material';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Register from "./register.js";
import Reset from "./reset.js";

const useStyles = makeStyles(() => ({
  login: {
    position: "relative",
    width: "400px",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)",
  },
  separator: {
    display: "flex",
    alignItems: "center",
    margin: "20px 16px",
    borderBottom: "1px solid #dadde1",
    width: "300px",
  },
}));

const Info = () => {
  const styles = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line

  return (
    <div className={styles.login}>
      <TextField
        fullWidth
        placeholder="Email address"
        variant="outlined"
        margin="normal"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormControl sx={{ width: "100%" }} variant="outlined" margin="normal">
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter')
              logInWithEmailAndPassword(email, password);
          }}
          placeholder="Password"
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
        />
      </FormControl>

      <Button
        fullWidth
        style={{
          margin: "20px",
          fontWeight: "bold",
          backgroundColor: "orange"
        }}
        variant="contained"
        onClick={() => logInWithEmailAndPassword(email, password)}
      >
        login
      </Button>
      <Popup
        closeOnDocumentClick={false}
        overlayStyle={{
          backgroundColor: "rgba(255, 255, 255, .8)",
        }}
        contentStyle={{
          width: "500px",
          padding: "30px",
          border: "none",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)",
        }}
        modal
        trigger={<div style={{ color: "blue" }}>Forgotten Password?</div>}
      >
        {close => <Reset close={close} />}
      </Popup>
      <div className={styles.separator} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>Don't have an account?&nbsp;</div>
        <Popup
          closeOnDocumentClick={false}
          overlayStyle={{
            backgroundColor: "rgba(255, 255, 255, .8)",
          }}
          contentStyle={{
            width: "500px",
            padding: "30px",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)",
          }}
          modal
          trigger={<div style={{ color: "blue" }}>Register</div>}
        >
          {close => <Register close={close} />}
        </Popup>
      </div>
      <Button
        style={{ marginTop: "20px", fontWeight: "bold", }}
        fullWidth
        variant="outlined"
        color="error"
        onClick={signInWithGoogle}
      >
        login with&nbsp;<Google />oogle
      </Button>
    </div >
  );
};

export default Info;