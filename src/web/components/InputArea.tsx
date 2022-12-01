import React, { useEffect, useState } from "react";
import classes from "../styles/InputArea.module.css";
import TextAreaAutoSize from "react-textarea-autosize";
import { RiSendPlane2Line } from "react-icons/ri";
import {
	Message as MessageInterface,
	NewMessage as NewMessageInterface,
} from "../types/message";

interface InputAreaProps {
	createMessage: (message: NewMessageInterface) => Promise<any>;
}

export const InputArea = (props: InputAreaProps) => {
	const { createMessage } = props;
	const [value, setValue] = useState<string>("");

	const execCommand = async (cmd: string) => {
		const newOwnMessage: NewMessageInterface = {
			text: cmd,
			isOwn: true,
		};
		await createMessage(newOwnMessage);
		const newMessage: NewMessageInterface = {
			text: await (window as any).electronAPI.execCommand(cmd),
			isOwn: false,
		};
		await createMessage(newMessage).then(() => {
			setValue("");
		});
	};

	const handleSubmit = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		execCommand(value);
		event.preventDefault();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		console.log(value);
		if (e.key === "BackSpace" && value.slice(-1) === "\n") {
			setValue(value);
			return;
		}
		if (e.key === "Enter" && e.shiftKey) {
			return;
		}
		if (e.key === "Enter") {
			execCommand(value);
			return;
		}
		return;
	};

	const handleOnChange = (value: string) => {
		setValue(value);
	};

	return (
		<div className={classes.input_area}>
			<TextAreaAutoSize
				maxRows={6}
				value={value}
				onChange={(e) => handleOnChange(e.target.value)}
				onKeyDown={(e) => handleKeyDown(e)}
				className={classes.text_area}
			></TextAreaAutoSize>
			<button
				className={`${classes.submit_button}`}
				onClick={(e) => handleSubmit(e)}
			>
				<RiSendPlane2Line></RiSendPlane2Line>
			</button>
		</div>
	);
};
