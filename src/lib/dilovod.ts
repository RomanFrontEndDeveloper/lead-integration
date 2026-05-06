export async function createDilovodClient(name: string, phone: string) {
	try {
		const res = await fetch('https://api.dilovod.ua/v1/objects', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Api-Key': process.env.DILOVOD_API_KEY!,
			},
			body: JSON.stringify({
				category: 'Клієнт',
				name,
				phone,
			}),
		});

		const text = await res.text();

		console.log('Dilovod raw:', text);

		if (!res.ok) {
			throw new Error('Dilovod API error');
		}

		return text;
	} catch (error) {
		console.error('Dilovod error:', error);

		throw error;
	}
}
