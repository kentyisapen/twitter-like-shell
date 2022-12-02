import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import classes from "../styles/MessageArea.module.css";
import { Message as MessageInterface } from "../types/message";
import { Message } from "./Message";

interface MessagesAreaProps {
	messages: MessageInterface[];
}

export const MessageArea = (props: MessagesAreaProps) => {
	const { messages } = props;
	const scrollBottomRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		scrollBottomRef?.current?.scrollIntoView();
	}, [messages]);
	return (
		<div className={classes.message_area}>
			{messages.map((message) => (
				<Message key={message.id + message.isOwn} message={message}></Message>
			))}
			<div ref={scrollBottomRef}></div>
		</div>
	);
};
