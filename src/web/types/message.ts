export interface Message {
	id: string;
	text: string;
	date: Date;
	isOwn: boolean;
}

export type NewMessage = Pick<Message, "text" | "isOwn">;
