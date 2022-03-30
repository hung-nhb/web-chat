import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../Config/MyFirebase";
import { collection, doc, onSnapshot, query, getDoc } from "firebase/firestore";
import ListUser from './ListUser'
import ChatBox from './ChatBox'
import { toast } from 'react-toastify';

const Messages = () => {
  // eslint-disable-next-line
  const [user, loading, error] = useAuthState(auth);
  const [res, setRes] = useState();
  const [currentChat, setCurrentChat] = useState();
  const navigate = useNavigate();

  const fetchUser = () => {
    try {
      onSnapshot(doc(db, "users", user.uid), (docs) => {
        setRes(docs.data());
        // if (!res)
        //   toast.success(`Login as ${docs.data().name}`);
      });
    }
    catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (loading)
      return;
    if (!user)
      return navigate("/web-chat/login");
    fetchUser();
    // eslint-disable-next-line
  }, [user, loading]);

  useEffect(() => {
    if (res && res.uid !== user.uid)
      toast.success(`Login as ${res.name}`);
  }, [res])

  return (
    <div style={{
      height: "100vh",
      backgroundColor: "white",
      color: "black",
      display: "flex",
    }}>
      {res &&
        <ListUser
          res={res}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
        />}
      <ChatBox
        res={res}
        currentChat={currentChat}
      />
    </div>
  );
}

export default Messages;