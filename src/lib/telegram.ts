export const sendTelegramAlert = async (message: string): Promise<boolean> => {
	const token = process.env.TG_TOKEN;
	const chatId = process.env.TG_CHAT_ID;

	// перевірка env
	if (!token || !chatId) {
		console.error('Telegram env variables are missing');
		return false;
	}

	try {
		const response = await fetch(
			`https://api.telegram.org/bot${token}/sendMessage`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					chat_id: chatId,
					text: message,
				}),
			},
		);

		// HTTP помилка
		if (!response.ok) {
			console.error('HTTP error:', response.status);
			return false;
		}

		const data = await response.json();

		// Telegram API помилка
		if (!data.ok) {
			console.error('Telegram API error:', data);
			return false;
		}

		return true;
	} catch (error) {
		console.error('Request failed:', error);
		return false;
	}
};
