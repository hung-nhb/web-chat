import React from 'react';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  title: {
    position: "relative",
    width: "580px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "50px",
    color: "orange",
  },
  contact: {
    fontWeight: "normal",
    fontSize: "25px",
  }
}));

const Welcome = () => {
  const styles = useStyles();

  return (
    <div className={styles.title}>
      Welcome to NiChat
      <div className={styles.contact}>
        developed by&nbsp;
        <a style={{ textDecoration: "none" }} href='mailto:hung.nhb@gmail.com'>
          Hùng Nguyễn Hoàng Bảo
        </a>
      </div>
    </div>
  );
}

export default Welcome;