import { validateForm } from '@/lib/validators';
import { createDilovodClient } from '@/lib/dilovod';
import { createSalesDriveLead } from '@/lib/salesdrive';

export async function POST(req: Request) {
	console.log('LEAD API CALLED');

	try {
		const { name, phone, website, timestamp } = await req.json();

		console.log('DATA:', { name, phone });

		// =========================
		// 🛡️ Honeypot anti-spam
		// =========================
		if (website) {
			console.log('🚨 SPAM DETECTED:', website);

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
		const salesSuccess = await createSalesDriveLead(name, phone);

		// =========================
		// ✅ Dilovod API
		// =========================
		try {
			await createDilovodClient(name, phone);

			console.log('Dilovod client created');
		} catch (error) {
			console.error('Dilovod error:', error);
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
