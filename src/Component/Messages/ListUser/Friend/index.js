import React, { useEffect, useState } from 'react';
import { db } from "MyFirebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import defaultAvatar from "assets/ic_default_avatar.png"

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

const Friend = ({ user, friend, currentChat, setCurrentChat }) => {
  const styles = useStyles();
  const mid = user > friend ? `{${user}-${friend}}` : `{${friend}-${user}}`;
  const [info, setInfo] = useState()
  const [lastestMessage, setLastestMessage] = useState();

  useEffect(() => {
    onSnapshot(doc(db, "users", friend), (docs) => {
      setInfo(docs.data());
    });
    onSnapshot(doc(db, "lastestMessages", mid), (docs) => {
      setLastestMessage(docs.data());
    });
    // eslint-disable-next-line
  }, []);

  const checkSeen = async () => {
    if (currentChat === friend && lastestMessage
      && lastestMessage.idFrom === friend && !lastestMessage.seen)
      await setDoc(doc(db, "lastestMessages", mid), {
        ...lastestMessage,
        seen: true,
        seenTimeStamp: new Date()
      });
  }

  useEffect(() => {
    checkSeen();
  }, [lastestMessage])

  return (
    <Button
      key={friend}
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
          currentChat === friend ? "#eaf3ff" : "",
      }}
      fullWidth
      variant={currentChat && currentChat === friend ? "contained" : "text"}
      onClick={async () => {
        setCurrentChat(friend);
        if (lastestMessage && lastestMessage.idFrom === friend && !lastestMessage.seen)
          await setDoc(doc(db, "lastestMessages", mid), {
            ...lastestMessage,
            seen: true,
            seenTimeStamp: new Date()
          });
      }}
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
        {lastestMessage &&
          <div style={{
            fontSize: "12 px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontWeight: (lastestMessage.idFrom === friend && !lastestMessage.seen)
              ? "bold" : "",
          }}>
            {`${lastestMessage.idFrom === user
              ? "You: " : ""}${lastestMessage.content}`}
          </div>
        }
      </div>}
    </Button>
  );
}

export default Friend;