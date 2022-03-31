import React, { useState } from "react";
import { auth } from "MyFirebase";
import { updatePassword } from "firebase/auth";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const changePassword = async () => {
    if (newPassword.length > 6) {
      updatePassword(auth.currentUser, newPassword);
      toast.success("Your password has been changed");
    }
    else {
      toast.warning("Your password is too short, try more than 6 characters");
    }
  };

  return (
    <>
      <FormControl fullWidth variant="outlined" margin="dense">
        <OutlinedInput
          style={{ backgroundColor: "#f5f6f7" }}
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setNewPassword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter')
              changePassword();
          }}
          placeholder="New Password"
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
      <div style={{ marginLeft: "20px" }}>
        <Button
          style={{
            width: "200px",
            fontWeight: "bold",
            borderColor: "orange",
            color: "orange",
          }}
          fullWidth
          variant="outlined"
          onClick={changePassword}
        >
          Change Password
        </Button>
      </div>
    </>
  );
};

export default ChangePassword;