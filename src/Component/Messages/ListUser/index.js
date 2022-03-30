import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { db, logout } from "../../../Config/MyFirebase";
import { collection, doc, getDoc, onSnapshot, query, where, getDocs } from "firebase/firestore";
import { Button, TextField } from '@mui/material';
import defaultAvatar from "../../../assets/ic_default_avatar.png"
import { MoreVert } from '@mui/icons-material';
import Popup from 'reactjs-popup';
import Settings from './Settings'
import User from './User';
import {toast} from 'react-toastify'

const useStyles = makeStyles(() => ({
  listUser: {
    width: "360px",
    borderRight: "1px solid rgb(0 0 0 / 10%)",
    paddingTop: "8px",
    paddingLeft: "8px",
    paddingRight: "8px",
    fontWeight: "bold",
  },
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
  seperator: {
    marginLeft: "16px",
    marginRight: "16px",
    borderBottom: "1px solid rgb(206 208 212)",
  },
}));

const ListUser = ({ res, currentChat, setCurrentChat }) => {
  const styles = useStyles();
  const [listFriend, setListFriend] = useState([]);
  const [oldListFriend, setOldListFriend] = useState([]);
  const [id, setID] = useState("");

  const fetchListFriend = async () => {
    try {
      onSnapshot(doc(db, "relationships", res.uid), (docs) => {
        const temp = docs.data().friends.reverse();
        setListFriend([...temp]);
        setOldListFriend([...temp]);
        if (temp.length > 0) {
          setCurrentChat(temp[0]);
        }
      });
    }
    catch (err) {
      alert(err);
    }
  };

  useState(() => {
    fetchListFriend();
  }, [res.uid]);

  useState(() => {
    if (listFriend.length > 1)
      setOldListFriend(listFriend);
  }, [listFriend]);

  const seacrhUser = async () => {
    const q = query(collection(db, "users"), where("nid", "==", id));
    const docs = await getDocs(q);
    setListFriend([docs.docs[0].data().uid]);
  };

  useEffect(() => {
    setListFriend([...oldListFriend]);
  }, [id]);

  return (
    <div className={styles.listUser}>
      <div className={styles.mainUser}>
        <img
          className={styles.avata}
          style={{ marginRight: "8px" }}
          alt="avata"
          src={(res && res.photoUrl) || defaultAvatar}
        />
        <div style={{ flexGrow: 1 }}>
          {res && `${res.name} (${res.nid})`}
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
            {close => <Settings close={close} res={res} />}
          </Popup>
          <Button fullWidth onClick={logout} >
            Log out
          </Button>
          <Button fullWidth onClick={() => toast.error("This feature is currently not available")}>
            Report a bug
          </Button>
        </Popup>
      </div>
      <TextField
        style={{
          paddingTop: "16px",
          paddingBottom: "24px",
          paddingLeft: "8px",
          paddingRight: "8px",
        }}
        fullWidth
        placeholder='Type ID and press Enter to search'
        value={id}
        onChange={(e) => setID(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter')
            seacrhUser();
        }}
        InputProps={{
          style: {
            height: "36px",
            color: 'black',
            borderRadius: "50px",
            backgroundColor: "#f0f2f5",
          },
        }}
      />
      <div className={styles.seperator} />
      {listFriend && listFriend.map((item) =>
        <User
          key={item}
          res={res}
          user={item}
          listFriend={listFriend}
          setListFriend={setListFriend}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
        />
      )}
    </div>
  );
}

export default ListUser;