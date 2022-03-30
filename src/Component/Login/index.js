import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../Config/MyFirebase';
import { makeStyles } from "@mui/styles";
import Welcome from './Welcome';
import Info from './Info'

const useStyles = makeStyles(() => ({
  background: {
    height: "100vh",
    backgroundColor: "#f0f2f5",
    paddingTop: "100px",
    paddingBottom: "100px",
  },
  content: {
    margin: "0 auto",
    width: "980px",
    height: "450px",
    display: "flex",
    flexDirection: "row",
  }
}));

const Login = () => {
  const styles = useStyles();
  // eslint-disable-next-line
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading)
      return;
    if (user)
      navigate("/web-chat/messages");
    // eslint-disable-next-line
  }, [user, loading]);

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <Welcome />
        <Info />
      </div>
    </div >
  );
}

export default Login;