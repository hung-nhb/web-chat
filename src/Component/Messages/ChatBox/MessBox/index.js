import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { db } from "../../../../Config/MyFirebase";
import { query, collection, onSnapshot } from "firebase/firestore";

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

const MessBox = ({ res, currentChat }) => {
  const styles = useStyles();
  const [log, setLog] = useState();
  const messagesEndRef = useRef(null);

  const fetchMessage = async () => {
    const mid = res.uid > currentChat
      ? `{${res.uid}-${currentChat}}`
      : `{${currentChat}-${res.uid}}`;

    try {
      const q = query(collection(db, "messages", mid, mid));
      onSnapshot(q, (querySnapshot) => {
        const temp = [];
        querySnapshot.forEach((item) => temp.push(item.data()));
        setLog(temp.sort((a, b) => a.timeStamp - b.timeStamp));
      });
    }
    catch (err) {
      console.error(err);
      alert("Error Fetch Messages");
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

  return (
    <div className={styles.messBox}>
      {!log && <div className={styles.noFriend}>
        Please find a friend with ID to chat
      </div>}
      {log && log.map((item, index) => (
        <div key={index}
          style={{
            width: "100%",
            display: "flex",
            justifyContent:
              item.idFrom === res.uid
                ? "flex-end"
                : "flex-start",
          }}
        >
          <div className={
            item.idFrom === res.uid
              ? styles.myChat
              : styles.friendChat}
          >
            {item.content}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessBox;