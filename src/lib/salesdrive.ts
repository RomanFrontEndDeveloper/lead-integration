import { sendTelegramAlert } from './telegram';

export async function createSalesDriveLead(name: string, phone: string) {
	try {
		const res = await fetch('https://roman-trend.salesdrive.me/handler/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Api-Key': process.env.SALESDRIVE_API_KEY!,
			},
			body: JSON.stringify({
				form: '1',
				fName: name,
				phone,
				comment: 'Lead from website',
			}),
		});

		console.log('SalesDrive status:', res.status);

		if (!res.ok) {
			throw new Error('SalesDrive request failed');
		}

		return true;
	} catch (error) {
		console.error('SalesDrive error:', error);

		await sendTelegramAlert(
			`❌ SalesDrive API error
      Name: ${name}
      Phone: ${phone}`,
		);

		return false;
	}
}
