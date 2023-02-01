import React, { useEffect, useState } from "react";
import classes from "../styles/InputArea.module.css";
import TextAreaAutoSize from "react-textarea-autosize";
import { RiSendPlane2Line } from "react-icons/ri";
import {
	Message as MessageInterface,
	NewMessage as NewMessageInterface,
} from "../types/message";
import { text } from "stream/consumers";

interface InputAreaProps {
	createMessage: (message: NewMessageInterface) => Promise<any>;
}

export const InputArea = (props: InputAreaProps) => {
	const { createMessage } = props;
	const [value, setValue] = useState<string>("");
	const [currentDirectory, setCurrentDirectory] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const execCommand = async (cmd: string) => {
		setLoading(true);
		const os = await (window as any).electronAPI.detectOs();
		const controlOperator =
			os === "win32" ? "&" : os === "linux" ? ";" : os === "darwin" ? ";" : ";";
		const newOwnMessage: NewMessageInterface = {
			text: cmd,
			isOwn: true,
		};
		await createMessage(newOwnMessage);
		const rawText = await (window as any).electronAPI.execCommand(
			"cd " +
				currentDirectory.slice(0, -1) +
				" " +
				controlOperator +
				" " +
				cmd +
				" " +
				controlOperator +
				" cd"
		);
		const textBody = rawText.split("\n").slice(0, -2).join("\n");
		const textCd = rawText.split("\n").slice(-2)[0];
		const newMessage: NewMessageInterface = {
			text: textBody,
			isOwn: false,
		};
		setCurrentDirectory(textCd);
		await createMessage(newMessage).then(() => {
			setValue("");
		});
		setLoading(false);
	};

	const handleSubmit = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		execCommand(value);
		event.preventDefault();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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

	const handleOnChange = (newValue: string) => {
		if (newValue.slice(-1) === "\n" && newValue.length > value.length) {
			setValue(newValue);
		}
		setValue(newValue);
	};

	useEffect(() => {
		(async () => {
			setCurrentDirectory(await (window as any).electronAPI.execCommand("cd"));
		})();
	}, []);

	console.log(classes);

	return (
		<div className={`${classes.input_area} ${loading ? classes.loader : ""}`}>
			<TextAreaAutoSize
				maxRows={6}
				value={value}
				onChange={(e) => handleOnChange(e.target.value)}
				onKeyDown={(e) => handleKeyDown(e)}
				className={`${classes.text_area}`}
				disabled={loading}
			></TextAreaAutoSize>
			<button
				className={`${classes.submit_button}`}
				onClick={(e) => handleSubmit(e)}
				disabled={loading}
			>
				<RiSendPlane2Line></RiSendPlane2Line>
			</button>
		</div>
	);
};
