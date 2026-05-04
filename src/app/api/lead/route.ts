import { sendTelegramAlert } from '@/lib/telegram';
import { validateForm } from '@/lib/validators';

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { name, phone, website, timestamp } = body;

		// 🛡️ Honeypot
		if (website) {
			return new Response(JSON.stringify({ error: 'Spam detected' }), {
				status: 400,
			});
		}

		// 🛡️ Timing
		if (Date.now() - timestamp < 3000) {
			return new Response(JSON.stringify({ error: 'Too fast' }), {
				status: 400,
			});
		}

		// ✅ Валідація
		const errors = validateForm(name, phone);
		if (Object.keys(errors).length > 0) {
			return new Response(JSON.stringify({ errors }), { status: 400 });
		}

		// =========================
		// 1. SalesDrive
		// =========================
		let salesResult = null;

		try {
			const res = await fetch('https://salesdrive.ua/api/order/add/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ form: { name, phone } }),
			});

			if (!res.ok) throw new Error('SalesDrive failed');

			salesResult = await res.json();
		} catch (e) {
			await sendTelegramAlert('❌ SalesDrive API error');
		}

		// =========================
		// 2. Діловод
		// =========================
		let dilovodResult = null;

		try {
			const res = await fetch('https://dilovod.ua/api/...', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					category: 'Клієнт',
					name,
					phone,
				}),
			});

			if (!res.ok) throw new Error('Dilovod failed');

			dilovodResult = await res.json();
		} catch (e) {
			await sendTelegramAlert('❌ Dilovod API error');
		}

		return Response.json({
			success: true,
			salesResult,
			dilovodResult,
		});
	} catch (error) {
		await sendTelegramAlert('🔥 SERVER CRASH');
		return new Response(JSON.stringify({ error: 'Server error' }), {
			status: 500,
		});
	}
}
