import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import classes from "../styles/TopMessage.module.css";

export const TopMessage = () => {
	return (
		<div className={classes.top_message_area}>
			<img
				className={classes.top_message_area__icon}
				src={require("../assets/bird_aoitori_bluebird.png")}
			></img>
			<span className={classes.top_message_area__name}>Twitter-Like-Shell</span>
			<span className={classes.top_message_area__subname}>@Kentyisapen</span>
			<span className={classes.top_message_area__introduction}>
				TwitterみたいなUIでコマンドラインを実行できるツールです！
			</span>
			<span className={classes.top_message_area__introduction2}>
				2022年12月からTwitter-Like-Shellを利用しています
			</span>
		</div>
	);
};
