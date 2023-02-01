import React, { useEffect, useState } from "react";
import { ReactPropTypes } from "react";

import classes from "../styles/Message.module.css";
import { Message as MessageInterface } from "../types/message";

interface MessageProps {
	message: MessageInterface;
}

export const Message = (props: MessageProps) => {
	const { message } = props;
	return (
		<div
			className={`${classes.message_wrapper} ${
				message.isOwn ? classes.own : classes.not_own
			}`}
		>
			<div className={classes.message}>
				{message.text.split("\n").map((line, index) => {
					return (
						<React.Fragment key={index}>
							{line}
							<br />
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};
