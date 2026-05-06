import { sendTelegramAlert } from '@/lib/telegram';
import { validateForm } from '@/lib/validators';

export async function POST(req: Request) {
	console.log('LEAD API CALLED');

	try {
		const { name, phone, website, timestamp } = await req.json();

		console.log('DATA:', { name, phone });

		// =========================
		// 🛡️ Honeypot anti-spam
		// =========================
		if (website) {
			return Response.json(
				{
					success: false,
					error: 'Spam detected',
				},
				{ status: 400 },
			);
		}

		// =========================
		// 🛡️ Timing anti-spam
		// =========================
		if (!timestamp || Date.now() - timestamp < 3000) {
			return Response.json(
				{
					success: false,
					error: 'Too fast',
				},
				{ status: 400 },
			);
		}

		// =========================
		// ✅ Validation
		// =========================
		const errors = validateForm(name, phone);

		if (Object.keys(errors).length > 0) {
			return Response.json(
				{
					success: false,
					errors,
				},
				{ status: 400 },
			);
		}

		// =========================
		// ✅ SalesDrive API
		// =========================
		let salesSuccess = false;

		try {
			const res = await fetch(
				'https://roman-trend.salesdrive.me/handler/',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'X-Api-Key': process.env.SALESDRIVE_API_KEY!,
					},
					body: JSON.stringify({
						form: '1',
						fName: name,
						phone: phone,
						comment: 'Lead from website',
					}),
				},
			);

			console.log('SalesDrive status:', res.status);

			if (!res.ok) {
				throw new Error('SalesDrive request failed');
			}

			salesSuccess = true;
		} catch (error) {
			console.error('SalesDrive error:', error);

			// =========================
			// 📢 Telegram alert
			// =========================
			await sendTelegramAlert(
				`❌ SalesDrive API error
		
        Name: ${name}
        Phone: ${phone}`,
			);
		}

		// =========================
		// ✅ Response
		// =========================
		return Response.json({
			success: salesSuccess,
		});
	} catch (error) {
		console.error('Server error:', error);

		return Response.json(
			{
				success: false,
				error: 'Server error',
			},
			{ status: 500 },
		);
	}
}
