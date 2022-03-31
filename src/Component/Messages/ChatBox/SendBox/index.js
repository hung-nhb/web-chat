import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { db } from "../../../../Config/MyFirebase";
import { collection, addDoc, doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { TextField } from '@mui/material';
import { AddPhotoAlternate, Send } from '@mui/icons-material/';
import { toast } from "react-toastify";

const useStyles = makeStyles(() => ({
  sendBox: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "12x",
    paddingBottom: "12x",
  },
  message: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  divIcon: {
    margin: "8px",
    padding: "8px",
  },
  icon: {
    height: "20px",
    width: "20px",
    color: "#d696bb",
  },
}));

const SendBox = ({ user, listFriend, currentChat }) => {
  const styles = useStyles();
  const [mid, setMid] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (currentChat) {
      setMid(user > currentChat
        ? `{${user}-${currentChat}}`
        : `{${currentChat}-${user}}`);
    }
    // eslint-disable-next-line
  }, [currentChat]);

  const sendMessage = async () => {
    if (!message) {
      toast.warning("Can't send an empty message");
      return;
    }

    if (!currentChat) {
      toast.warning("Please a user to send the message");
      return;
    }

    try {
      const lastestMessage = {
        content: message,
        idFrom: user,
        idTo: currentChat,
        timeStamp: new Date(),
      };

      await addDoc(collection(db, "messages", mid, mid), {
        ...lastestMessage
      });
      await setDoc(doc(db, "lastestMessages", mid), {
        ...lastestMessage,
        seen: false
      });

      updateDoc(doc(db, "relationships", user), {
        friends: listFriend.length > 0
          ? [currentChat, ...(listFriend.filter((item) => item !== currentChat))]
          : [currentChat]
      });

      const q = doc(db, "relationships", currentChat);
      const docs = await getDoc(q);
      const friends = docs.data().friends;
      updateDoc(q, {
        friends: friends.length > 0
          ? [user, ...(friends.filter((item) => item !== user))]
          : [user]
      });

      setMessage("");
    }
    catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.sendBox}>
      <div className={styles.message}>
        <div className={styles.divIcon}>
          <AddPhotoAlternate
            className={styles.icon}
            onClick={() => toast.error("This feature is currently not available")}
          />
        </div>
        <TextField
          placeholder="Type something"
          variant="outlined"
          fullWidth
          autoComplete='off'
          value={message}
          InputProps={{
            style: {
              color: 'black',
              marginTop: "8px",
              marginBottom: "8px",
              height: "36px",
              borderRadius: "20px",
              backgroundColor: "#f0f2f5",
            },
          }}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter')
              sendMessage();
          }}
        />
      </div>
      <div className={styles.divIcon}>
        <Send
          className={styles.icon}
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};

export default SendBox;