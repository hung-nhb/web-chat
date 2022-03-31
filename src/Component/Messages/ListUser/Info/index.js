import React, { useState } from 'react';
import { db, logout } from "MyFirebase";
import { doc, getDoc } from "firebase/firestore";
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import defaultAvatar from "assets/ic_default_avatar.png"
import { MoreVert } from '@mui/icons-material';
import Popup from 'reactjs-popup';
import Settings from './Settings'
import { toast } from 'react-toastify'

const useStyles = makeStyles(() => ({
  mainUser: {
    display: "flex",
    alignItems: "center",
    marginTop: "8px",
  },
  avata: {
    borderRadius: "50%",
    width: "50px",
    height: "50px",
  },
}));

const Info = ({ user }) => {
  const styles = useStyles();
  const [userData, setUserData] = useState();

  const fetchUser = async () => {
    try {
      const q = doc(db, "users", user);
      const docs = await getDoc(q);
      const data = docs.data();
      setUserData(data);
      toast.success(`Login as ${data.name}`);
    }
    catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useState(() => {
    fetchUser();
  }, []);

  return (
    <>
      {userData && <div className={styles.mainUser}>
        <img
          className={styles.avata}
          style={{ marginRight: "8px" }}
          alt="avata"
          src={userData.photoUrl || defaultAvatar}
        />
        <div style={{ flexGrow: 1 }}>
          {`${userData.name} (${userData.nid})`}
        </div>
        <Popup
          closeOnDocumentClick={false}
          trigger={<MoreVert />}
          contentStyle={{
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)",
          }}
        >
          <Popup
            closeOnDocumentClick={false}
            overlayStyle={{
              backgroundColor: "rgba(255, 255, 255, .8)",
            }}
            contentStyle={{
              width: "700px",
              padding: "30px",
              border: "none",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)",
            }}
            modal
            trigger={<Button fullWidth>Settings</Button>}
          >
            {close => <Settings close={close} userData={userData} setUserData={setUserData} />}
          </Popup>
          <Button fullWidth onClick={() => {
            logout();
            toast.success("You have been logged out");
          }} >
            Log out
          </Button>
          <a style={{ textDecoration: "none" }} href='mailto:hung.nhb@gmail.com'>
            <Button fullWidth >
              Report a bug
            </Button>
          </a>
        </Popup>
      </div>}
    </>
  );
}

export default Info;