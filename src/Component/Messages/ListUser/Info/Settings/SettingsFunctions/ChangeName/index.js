import React, { useState } from "react";
import { db } from "MyFirebase";
import { doc, updateDoc } from "firebase/firestore";
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';

const ChangeName = ({ userData, setUserData }) => {
  const [name, setName] = useState(userData.name);

  const changeName = async () => {
    if (name === userData.name) {
      toast.success("This is your old name");
    }
    else {
      const docs = doc(db, "users", userData.uid);
      await updateDoc(docs, {
        name: name,
      });
      setUserData({ ...userData, name: name });
      toast.success(`Your name has been changed to ${name}`);
    }
  };

  return (
    <>
      <TextField
        style={{ backgroundColor: "#f5f6f7" }}
        value={name}
        fullWidth
        placeholder="Full Name"
        variant="outlined"
        margin="dense"
        autoComplete='off'
        onChange={(e) => setName(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter')
            changeName();
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
          onClick={changeName}
        >
          Change Name
        </Button>
      </div>
    </>
  );
};

export default ChangeName;