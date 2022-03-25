import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../Config/MyFirebase";
import { query, collection, getDocs, where, doc, updateDoc } from "firebase/firestore";
import { TextField, Button } from '@mui/material';
import { Logout } from '@mui/icons-material';
import defaultAvatar from "../../assets/ic_default_avatar.png"
import './style.css'

const Profile = () => {
  // eslint-disable-next-line
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const docs = await getDocs(q);
      setData(docs.docs[0].data());
    }
    catch (err) {
      console.error(err);
      alert("Error Fectch User Profile");
    }
  };

  useEffect(() => {
    if (loading)
      return;
    if (!user)
      return navigate("/login");
    fetchUser();
    // eslint-disable-next-line
  }, [user, loading]);

  const changeName = async () => {
    const docs = doc(db, "users", data.uid);
    await updateDoc(docs, {
      name: data.name,
    });
    alert(`Your name has been changed to ${data.name}`);
  };

  return (
    <div className='profile'>
      <div className='infoProfile'>
        <Logout className='logout' onClick={logout} />
        <img
          className='avataProfile'
          alt='avt'
          src={(data && data.photoUrl) || defaultAvatar}
        />
        <TextField
          style={{ width: "75%" }}
          label="Full Name"
          variant="outlined"
          margin="normal"
          autoComplete='off'
          value={data && data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          focused
        />
        <Button
          style={{ width: "75%", marginTop: "5%" }}
          variant="contained"
          color="error"
          onClick={changeName}
        >
          change name
        </Button>
      </div>
    </div>
  );
}

export default Profile;