import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "MyFirebase";
import { doc, onSnapshot } from "firebase/firestore";
import ListUser from './ListUser'
import ChatBox from './ChatBox'
import { toast } from 'react-toastify';

const Messages = () => {
  // eslint-disable-next-line
  const [user, loading, error] = useAuthState(auth);
  const [listFriend, setListFriend] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const navigate = useNavigate();

  const fetchListFriend = async () => {
    try {
      onSnapshot(doc(db, "relationships", user.uid), (docs) => {
        const friends = docs.data().friends;
        if (friends.length > 0) {
          setListFriend(friends);
          if (!currentChat)
            setCurrentChat(friends[0]);
        }
      })
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
    fetchListFriend();
    // eslint-disable-next-line
  }, [user, loading]);

  return (
    <div style={{
      height: "100vh",
      backgroundColor: "white",
      color: "black",
      display: "flex",
    }}>
      {user && <>
        <ListUser
          user={user.uid}
          listFriend={listFriend}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
        />
        <ChatBox
          user={user.uid}
          listFriend={listFriend}
          currentChat={currentChat}
        />
      </>}
    </div>
  );
}

export default Messages;