import React, { useEffect, useState, useRef } from 'react';
import { db } from "../../../Config/MyFirebase";
import { query, collection, addDoc, onSnapshot } from "firebase/firestore";
import { TextField } from '@mui/material';
import { Send } from '@mui/icons-material/';
import defaultAvatar from "../../../assets/ic_default_avatar.png"
import './chatbox.css'

const ChatBox = ({ res, currentChat }) => {
  const messagesEndRef = useRef(null)
  const [message, setMessage] = useState();
  const [log, setLog] = useState();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  }

  useEffect(() => {
    scrollToBottom();
  }, [log]);

  const fetchMessage = async () => {
    const mid = res.uid > currentChat.uid
      ? `{${res.uid}-${currentChat.uid}}`
      : `{${currentChat.uid}-${res.uid}}`;

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

  const sendMessage = async () => {
    if (!message) {
      return;
    }

    const mid = res.uid > currentChat.uid
      ? `{${res.uid}-${currentChat.uid}}`
      : `{${currentChat.uid}-${res.uid}}`;
    try {
      await addDoc(collection(db, "messages", mid, mid), {
        content: message,
        idFrom: res.uid,
        idTo: currentChat.uid,
        timeStamp: new Date(),
      });
      setMessage("");
    }
    catch (err) {
      console.error(err);
      alert("Error Send Message");
    }
  };

  return (
    <div className='chatbox'>
      <div className='name'>
        <img
          className='avata'
          alt='avata'
          src={(currentChat && currentChat.photoUrl) || defaultAvatar}
        />
        &emsp;{currentChat && currentChat.name}
      </div>
      <div id='b' className='messbox'>
        {log && log.map((item, index) => (
          <div key={index}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: item.idFrom === res.uid ? "flex-end" : "flex-start",
            }}
          >
            <div className={item.idFrom === res.uid ? "myChat" : "friendChat"}>
              {item.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className='sendbox'>
        <TextField
          placeholder="Type something"
          variant="outlined"
          fullWidth
          margin="normal"
          autoComplete='off'
          value={message}
          InputProps={{
            style: {
              color: 'white',
              borderRadius: "30px",
              backgroundColor: "rgb(62 64 66)",
            },
          }}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter')
              sendMessage();
          }}
        />
        <Send
          className='send'
          onClick={sendMessage}
        />
      </div>
    </div>
  );
}

export default ChatBox;