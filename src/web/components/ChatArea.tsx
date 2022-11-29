import React from 'react';
import classes from "../styles/ChatArea.module.css"
import { InputArea } from './InputArea';
import { MessageArea } from './MessageArea';

export const ChatArea = () => {
  return  (
    <div className={classes.chat_area}>
      <MessageArea></MessageArea>
      <InputArea></InputArea>
    </div>
  );
}

