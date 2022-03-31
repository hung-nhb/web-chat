import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { db } from "MyFirebase";
import { query, collection, onSnapshot, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const useStyles = makeStyles(() => ({
  messBox: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "auto",
    overflow: "auto",
    paddingLeft: "16px",
    paddingRight: "16px",
    fontSize: ".9375rem",
  },
  noFriend: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "25px",
  },
  myChat: {
    marginTop: "2px",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "12px",
    paddingRight: "12px",
    backgroundColor: "#d696bb",
    borderRadius: "20px",
    maxWidth: "564px",
    color: "white",
  },
  friendChat: {
    marginTop: "2px",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "12px",
    paddingRight: "12px",
    backgroundColor: "#e4e6eb",
    borderRadius: "20px",
    maxWidth: "564px",
  }
}));

const MessBox = ({ user, currentChat }) => {
  const styles = useStyles();
  const [log, setLog] = useState();
  const [lastestMessage, setLastestMessage] = useState();
  const messagesEndRef = useRef(null);

  const fetchMessage = async () => {
    const mid = user > currentChat
      ? `{${user}-${currentChat}}`
      : `{${currentChat}-${user}}`;

    try {
      const q = query(collection(db, "messages", mid, mid));
      onSnapshot(q, (querySnapshot) => {
        const temp = [];
        querySnapshot.forEach((item) => temp.push(item.data()));
        setLog(temp.sort((a, b) => a.timeStamp - b.timeStamp));
      });
      onSnapshot(doc(db, "lastestMessages", mid), (docs) => {
        setLastestMessage(docs.data());
      });
    }
    catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (currentChat) {
      fetchMessage();
    }
    // eslint-disable-next-line
  }, [currentChat])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  }

  useEffect(() => {
    scrollToBottom();
  }, [log]);

  const getTime = (time) => {
    const temp = new Date(time);
    const hours = temp.getHours();
    const minutes = temp.getMinutes();
    return (hours > 9 ? hours : `0${hours}`) + ":" + (minutes > 9 ? minutes : `0${minutes}`);
  };

  return (
    <div className={styles.messBox}>
      {!log && <div className={styles.noFriend}>
        Please find a friend with ID to chat
      </div>}
      {log && <>
        {log.map((item, index) => (
          <div key={index}
            style={{
              width: "100%",
              display: "flex",
              justifyContent:
                item.idFrom === user
                  ? "flex-end"
                  : "flex-start",
            }}
          >
            <div className={
              item.idFrom === user
                ? styles.myChat
                : styles.friendChat}
            >
              {item.content}
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {lastestMessage && lastestMessage.idFrom === user &&
            lastestMessage.seen && `Seen at ${getTime(lastestMessage.seenTimeStamp.seconds * 1000)}`}
        </div>
      </>
      }
      <div ref={messagesEndRef} />
    </div >
  );
};

export default MessBox;