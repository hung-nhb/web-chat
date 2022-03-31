import React, { useState } from "react";
import { db } from "MyFirebase";
import { doc, updateDoc, query, getDocs, collection, where } from "firebase/firestore";
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';

const ChangeID = ({ userData, setUserData }) => {
  const [id, setID] = useState(userData.nid);

  const changeID = async () => {
    if (id === userData.nid) {
      toast.success("This is your old ID");
    }
    else {
    const q = query(collection(db, "users"), where("nid", "==", id));
    const docs = await getDocs(q);
    if (docs.docs.length !== 0) {
      toast.warning("This ID is already in use by another user, please choose another ID");
      return;
    }
    await updateDoc(doc(db, "users", userData.uid), {
      nid: id,
    });
    setUserData({ ...userData, nid: id });
    toast.success(`Your ID has been changed to ${id}`);
  }
  };

  return (
    <>
      <TextField
        style={{ backgroundColor: "#f5f6f7" }}
        value={id}
        fullWidth
        placeholder="ID"
        variant="outlined"
        margin="dense"
        onChange={(e) => setID(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter')
            changeID();
        }}
      />
      <div style={{ marginLeft: "20px" }}>
        <Button
          style={{
            width: "200px",
            fontWeight: "bold",
            borderColor: "orange",
            color: "orange",
          }}
          fullWidth
          variant="outlined"
          onClick={changeID}
        >
          Change ID
        </Button>
      </div>
    </>
  );
};

export default ChangeID;