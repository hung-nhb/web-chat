import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDn7wxVioxPa87JdXpYGHXl9WoVX_NRabk",
  authDomain: "web-chat-9920e.firebaseapp.com",
  databaseURL: "https://web-chat-9920e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-chat-9920e",
  storageBucket: "web-chat-9920e.appspot.com",
  messagingSenderId: "455617320029",
  appId: "1:455617320029:web:880fdf09f191c421dfa9b4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      let randomNID, qNID, docsNID;
      do {
        randomNID = Math.random().toString(36).substring(2);
        qNID = query(collection(db, "users"), where("nid", "==", randomNID));
        docsNID = await getDocs(qNID);
      } while (docsNID.docs.length > 0);
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        photoUrl: user.photoURL,
        nid: randomNID,
      });
      await setDoc(doc(db, "relationships", user.uid), {
        friends: [],
      });
    }
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    let randomNID, qNID, docsNID;
    do {
      randomNID = Math.random().toString(36).substring(2);
      qNID = query(collection(db, "users"), where("nid", "==", randomNID));
      docsNID = await getDocs(qNID);
    } while (docsNID.docs.length > 0);
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      nid: randomNID,
    });
    await setDoc(doc(db, "relationships", user.uid), {
      friends: [],
    });
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.info("Password reset mail has been sent, please check your mailbox")
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};