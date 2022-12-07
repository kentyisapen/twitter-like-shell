import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import classes from "../styles/ChatArea.module.css";
import { InputArea } from "./InputArea";
import { MessageArea } from "./MessageArea";
import {
	Message as MessageInterface,
	NewMessage as NewMessageInterface,
} from "../types/message";
import { TopMessage } from "./TopMessage";

export const ChatArea = () => {
	const [messages, setMessages] = useState<MessageInterface[]>([]);

	useEffect(() => {
		console.log(messages);
	}, [messages]);

	const generateUUID = () => {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
			/[xy]/g,
			function (a) {
				let r = (new Date().getTime() + Math.random() * 16) % 16 | 0,
					v = a == "x" ? r : (r & 0x3) | 0x8;
				return v.toString(16);
			}
		);
	};

	const createMessage = async (message: NewMessageInterface) => {
		return new Promise((resolve) => {
			const newMessage: MessageInterface = {
				id: generateUUID(),
				text: message.text,
				date: new Date(),
				isOwn: message.isOwn,
			};
			setMessages((prevMessages) => [...prevMessages, newMessage]);
			resolve(null);
		});
	};

	return (
		<div className={classes.chat_area}>
			<TopMessage></TopMessage>
			<MessageArea messages={messages}></MessageArea>
			<InputArea createMessage={createMessage}></InputArea>
		</div>
	);
};
