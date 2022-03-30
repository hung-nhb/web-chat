import React from 'react';
import { makeStyles } from "@mui/styles";
import Info from './Info';
import MessBox from './MessBox';
import SendBox from './SendBox';

const useStyles = makeStyles(() => ({
  chatBox: {
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
  },
}));

const ChatBox = ({ res, currentChat }) => {
  const styles = useStyles();

  return (
    <div className={styles.chatBox}>
      <Info currentChat={currentChat} />
      <MessBox res={res} currentChat={currentChat} />
      <SendBox res={res} currentChat={currentChat} />
    </div>
  );
}

export default ChatBox;