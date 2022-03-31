import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { db } from "MyFirebase";
import { collection,query, where, getDocs } from "firebase/firestore";
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import Info from './Info';
import Friend from './Friend'

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

const ListUser = ({ user, listFriend, currentChat, setCurrentChat }) => {
  const styles = useStyles();
  const [id, setID] = useState("");

  const seacrhUser = async () => {
    const q = query(collection(db, "users"), where("nid", "==", id));
    const docs = await getDocs(q);
    if (docs.docs.length > 0) {
      setCurrentChat(docs.docs[0].data().uid);
      setID("");
    }
    else {
      toast.warning("Don't have any user using this ID, check carefully and try again");
    }
  };

  return (
    <div className={styles.listUser}>
      <Info user={user} />
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
        <Friend
          key={item}
          user={user}
          friend={item}
          listFriend={listFriend}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
        />
      )}
    </div>
  );
}

export default ListUser;