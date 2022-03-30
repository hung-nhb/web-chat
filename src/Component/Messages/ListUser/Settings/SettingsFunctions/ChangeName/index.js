import React, { useState } from "react";
import { db } from "../../../../../../Config/MyFirebase";
import { doc, updateDoc } from "firebase/firestore";
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';

const ChangeName = ({ res }) => {
  const [name, setName] = useState(res.name);

  const changeName = async () => {
    const docs = doc(db, "users", res.uid);
    await updateDoc(docs, {
      name: name,
    });
    toast.success(`Your name has been changed to ${name}`);
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