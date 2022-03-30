import React, { useEffect, useRef, useState } from 'react';
import { db } from "../../../../Config/MyFirebase";
import { updateDoc, doc, onSnapshot, arrayRemove, arrayUnion } from "firebase/firestore";
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import defaultAvatar from "../../../../assets/ic_default_avatar.png"

const useStyles = makeStyles(() => ({
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

const User = ({ res, user, listFriend, setListFriend, currentChat, setCurrentChat }) => {
  const styles = useStyles();
  const mid = res.uid > user ? `{${res.uid}-${user}}` : `{${user}-${res.uid}}`;
  const [info, setInfo] = useState()
  const [lastestMessage, setLastestMessage] = useState();
  const update = useRef(false);

  const fetchListFriend = async () => {
    await updateDoc(doc(db, "relationships", res.uid), {
      friends: arrayRemove(user),
    });
    await updateDoc(doc(db, "relationships", res.uid), {
      friends: arrayUnion(user),
    });
    setListFriend([user, ...listFriend.filter((item) => item !== user)]);
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", user), (docs) => {
      setInfo(docs.data());
    });
    onSnapshot(doc(db, "lastestMessages", mid), (docs) => {
      if (docs.data()) {
        setLastestMessage(docs.data());
        if (update.current)
          fetchListFriend();
        update.current = true;
      }
    });
  }, []);

  return (
    <Button
      key={user}
      startIcon={<img
        className={styles.avata}
        alt="avata"
        src={(info && info.photoUrl) || defaultAvatar}
      />}
      style={{
        padding: "8px",
        color: "black",
        textTransform: "none",
        justifyContent: "flex-start",
        backgroundColor: currentChat &&
          currentChat === user ? "#eaf3ff" : "",
      }}
      fullWidth
      variant={currentChat && currentChat === user ? "contained" : "text"}
      onClick={() => setCurrentChat(user)}
    >
      {info && <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
      }}>
        <div style={{
          fontSize: "15px",
          fontWeight: "bold",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {`${info.name} (${info.nid})`}
        </div>
        <div style={{
          fontSize: "12 px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {lastestMessage && `${lastestMessage.idFrom === res.uid
            ? "You: " : ""}${lastestMessage.content}`}
        </div>
      </div>}
    </Button>
  );
}

export default User;