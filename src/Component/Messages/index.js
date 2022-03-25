import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../Config/MyFirebase";
import { query, collection, onSnapshot } from "firebase/firestore";
import ListUser from './ListUser'
import ChatBox from './ChatBox'
import './messages.css'

const Messages = () => {
  // eslint-disable-next-line
  const [user, loading, error] = useAuthState(auth);
  const [res, setRes] = useState("");
  const [listFriend, setListFriend] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const navigate = useNavigate();

  const fetchAllUser = async () => {
    try {
      const q = query(collection(db, "users"));
      onSnapshot(q, (querySnapshot) => {
        const temp = [];
        querySnapshot.forEach((item) => temp.push(item.data()));
        setListFriend(temp.map((item) => {
          if (item.uid === user.uid)
            return setRes(item);
          else
            return item;
        }).filter((item) => item));
        setCurrentChat(temp.find((item) => item.uid !== user.uid));
      });
    }
    catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading)
      return;
    if (!user)
      return navigate("/login");
    fetchAllUser();
    // eslint-disable-next-line
  }, [user, loading]);

  return (
    <div className='dashboard'>
      <ListUser
        res={res}
        listFriend={listFriend}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
      />
      <ChatBox
        res={res}
        currentChat={currentChat}
      />
    </div>
  );
}

export default Messages;