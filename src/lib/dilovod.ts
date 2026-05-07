export async function createDilovodClient(name: string, phone: string) {
	try {
		const packet = {
			version: '0.25',

			key: process.env.DILOVOD_API_KEY,

			action: 'saveObject',

			params: {
				header: {
					id: 'catalogs.persons',

					name: {
						uk: name,
					},

					personType: 1004000000000035,

					details: JSON.stringify({
						phones: [
							{
								type: 'main',
								value: phone,
							},
						],
					}),
				},
			},
		};

		const res = await fetch('https://api.dilovod.ua', {
			method: 'POST',

			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},

			body: new URLSearchParams({
				packet: JSON.stringify(packet),
			}),
		});

		const data = await res.json();

		console.log('Dilovod raw:', data);

		if (data.error) {
			throw new Error(data.error);
		}

		return data;
	} catch (error) {
		console.error('Dilovod error:', error);

		throw error;
	}
}
