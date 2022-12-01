import React, {useEffect, useState} from 'react';
import classes  from "../styles/MessageArea.module.css"
import { Message as MessageInterface } from '../types/message'
import { Message } from './Message';

interface MessagesAreaProps {
  messages: MessageInterface[]
}

export const MessageArea = (props: MessagesAreaProps) => {
  const {messages} = props

  return (
    <div className={classes.message_area}>
      {messages.map(message => (
        <Message key={message.id + message.isOwn}  message={message}></Message>
      ))}
    </div>
  );
}

