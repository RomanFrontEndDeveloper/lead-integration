export const sendTelegramAlert = async (message: string) => {
	const token = process.env.TG_TOKEN;
	const chatId = process.env.TG_CHAT_ID;

	if (!token || !chatId) return;

	await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			chat_id: chatId,
			text: message,
		}),
	});
};
