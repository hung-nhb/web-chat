import React, { useState, useEffect } from "react";
import { db } from "../../../../Config/MyFirebase";
import { makeStyles } from "@mui/styles";
import defaultAvatar from "assets/ic_default_avatar.png"
import { Call, Videocam, MoreVert } from '@mui/icons-material';
import { Button } from '@mui/material';
import Popup from 'reactjs-popup';
import { toast } from "react-toastify";
import { doc, onSnapshot } from "firebase/firestore";

const useStyles = makeStyles(() => ({
  info: {
    paddingTop: "6px",
    paddingBottom: "6px",
    paddingLeft: "10px",
    paddingRight: "10px",
    display: "flex",
    flexDirection: "row",
    boxShadow: "0 0 4px rgb(0 0 0 / 20%)",
  },
  avata: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
  name: {
    padding: "6px",
    display: "flex",
    flexGrow: "1",
    flexDirection: "column",
    justifyContent: "center",
  },
  more: {
    padding: "6px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    padding: "6px",
    color: "#d696bb",
  }
}));

const Info = ({ currentChat }) => {
  const styles = useStyles();
  const [data, setData] = useState();

  useEffect(() => {
    if (currentChat)
      onSnapshot(doc(db, "users", currentChat), (docs) => {
        setData(docs.data());
      });
  }, [currentChat]);

  return (
    <div className={styles.info}>
      {data &&
        <>
          <div style={{ padding: "6px" }}>
            <img
              className={styles.avata}
              alt='avata'
              src={data.photoUrl || defaultAvatar}
            />
          </div>
          <div className={styles.name}>
            <div style={{ fontSize: "1.0625rem", fontWeight: "bold" }}>
              {`${data.name} (${data.nid})`}
            </div>
            <div style={{ fontSize: ".8125rem" }}>
              Chắc là đang hoạt động
            </div>
          </div>
          <div className={styles.more}>
            <div className={styles.icon}>
              <Call onClick={() => toast.error("This feature is currently not available")} />
            </div>
            <div className={styles.icon}>
              <Videocam onClick={() => toast.error("This feature is currently not available")} />
            </div>
            <div className={styles.icon}>
              <Popup
                trigger={<MoreVert />}
                position="left top"
                contentStyle={{
                  width: "300px",
                  border: "none",
                  borderRadius: "10px",
                  boxShadow: "0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)",
                }}
              >
                <Button fullWidth onClick={() => toast.error("This feature is currently not available")}>
                  Delete conversation
                </Button>
                <Button fullWidth onClick={() => toast.error("This feature is currently not available")}>
                  Something else
                </Button>
              </Popup>
            </div>
          </div>
        </>}
    </div>
  );
};

export default Info;