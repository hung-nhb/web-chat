import React from "react";
import { makeStyles } from "@mui/styles";
import { Close } from '@mui/icons-material';
import { ChangeName, ChangeID, ChangeEmail, ChangePassword } from "./SettingsFunctions";

const useStyles = makeStyles(() => ({
  register: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  back: {
    marginTop: "2%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
}));

const Settings = ({ close, userData, setUserData }) => {
  const styles = useStyles();

  return (
    <div className={styles.register}>
      <Close
        style={{
          position: "absolute",
          zIndex: 1,
          top: "20px",
          right: "20px",
        }}
        onClick={close}
      />
      <div className={styles.title}>
        Settings
      </div>
      {[
        <ChangeName userData={userData} setUserData={setUserData} />,
        <ChangeID userData={userData} setUserData={setUserData} />,
        <ChangeEmail userData={userData} setUserData={setUserData} />,
        <ChangePassword />
      ].map((item, index) =>
        <div key={index} className={styles.row}>
          {item}
        </div>
      )}
    </div>
  );
}

export default Settings;