import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import defaultAvatar from "../../../assets/ic_default_avatar.png"
import './listuser.css'

const ListUser = ({ res, listFriend, currentChat, setCurrentChat }) => {
  const navigate = useNavigate();

  return (
    <div className='listuser'>
      <Button
        startIcon={<img className='avata' alt="avata" src={res.photoUrl || defaultAvatar} />}
        style={{
          padding: "1rem",
          fontWeight: "bold",
          color: "white",
          textTransform: "none",
          justifyContent: "flex-start"
        }}
        fullWidth
        variant='text'
        onClick={() => navigate("/profile")}
      >
        {res.name}
      </Button>
      <TextField
        fullWidth
        placeholder='Tìm kiếm'
        InputProps={{
          style: {
            marginTop: "1rem",
            marginBottom: "1rem",
            color: 'white',
            borderRadius: "30px",
            backgroundColor: "rgb(62 64 66)",
          },
        }}
      />
      {listFriend.map((item) => (
        <Button key={item.uid}
          startIcon={<img className='avata' alt="avata" src={item.photoUrl || defaultAvatar} />}
          style={{
            paddingLeft: "1rem",
            fontWeight: "bold",
            color: "white",
            textTransform: "none",
            justifyContent: "flex-start"
          }}
          fullWidth
          variant={currentChat && currentChat.uid === item.uid ? "contained" : "text"}
          onClick={() => setCurrentChat(item)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
}

export default ListUser;