import React, { useState } from "react";
import { auth, db } from "../../../../../../Config/MyFirebase";
import { updateEmail } from "firebase/auth";
import { doc, updateDoc, query, collection, where, getDocs } from "firebase/firestore";
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';

const ChangeEmail = ({ res }) => {
  const [email, setEmail] = useState(res.email);

  const changeEmail = async () => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const docsCheck = await getDocs(q);
    if (docsCheck.docs.length !== 0) {
      toast.warning("This email is already in use by another user, please choose another email");
      return;
    }
    updateEmail(auth.currentUser, email);
    const docs = doc(db, "users", res.uid);
    await updateDoc(docs, {
      email: email,
    });
    toast.success(`Your email has been changed to ${email}`);
  };

  return (
    <>
      <TextField
        style={{ backgroundColor: "#f5f6f7" }}
        value={email}
        fullWidth
        placeholder="Email"
        variant="outlined"
        margin="dense"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter')
            changeEmail();
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
          onClick={changeEmail}
        >
          Change Email
        </Button>
      </div>
    </>
  );
}

export default ChangeEmail;