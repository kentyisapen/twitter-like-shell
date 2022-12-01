import React, { useEffect, useState } from 'react';
import { ReactPropTypes } from 'react';

import classes from "../styles/Message.module.css"
import { Message as MessageInterface } from '../types/message';

interface MessageProps {
  message: MessageInterface
}

export const Message = (props: MessageProps) => {
  const {message} = props
  return (
    <div>
      {message.text}
    </div>
  )
}