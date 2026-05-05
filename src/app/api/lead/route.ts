import { sendTelegramAlert } from '@/lib/telegram';
import { validateForm } from '@/lib/validators';

export async function POST(req: Request) {
	console.log('LEAD API CALLED');

	try {
		const { name, phone, website, timestamp } = await req.json();

		console.log('DATA:', { name, phone });

		// 🛡️ Honeypot
		if (website) {
			return Response.json(
				{ success: false, error: 'Spam detected' },
				{ status: 400 },
			);
		}

		// 🛡️ Timing
		if (!timestamp || Date.now() - timestamp < 3000) {
			return Response.json(
				{ success: false, error: 'Too fast' },
				{ status: 400 },
			);
		}

		// ✅ Валідація
		const errors = validateForm(name, phone);
		if (Object.keys(errors).length > 0) {
			return Response.json({ success: false, errors }, { status: 400 });
		}

		// =========================
		// SalesDrive (ПРАВИЛЬНО)
		// =========================
		let salesResult: any = null;

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
						fName: name, // ⚠️ не name!
						phone: phone,
					}),
				},
			);

			const text = await res.text();
			console.log('SalesDrive raw response:', text);

			let data: any = {};
			try {
				data = JSON.parse(text);
			} catch {}

			if (!res.ok || data?.status === 'error') {
				throw new Error(data?.message || 'SalesDrive error');
			}

			salesResult = data;
		} catch (error) {
			console.error('SalesDrive error:', error);

			await sendTelegramAlert(
				`❌ SalesDrive error\nName: ${name}\nPhone: ${phone}`,
			);
		}

		return Response.json({
			success: Boolean(salesResult),
			data: { salesResult },
		});
	} catch (error) {
		console.error('Server error:', error);

		return Response.json(
			{ success: false, error: 'Server error' },
			{ status: 500 },
		);
	}
}
