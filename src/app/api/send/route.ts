import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	console.log('SEND API CALLED');
	try {
		const { name, phone } = await req.json(); // ✅

		const res = await fetch(
			'https://roman-trend.salesdrive.me/api/order/add/',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Api-Key': process.env.SALESDRIVE_API_KEY!,
				},
				body: JSON.stringify({
					form: 1,
					name,
					phone,
				}),
			},
		);

		const data = await res.json();

		return NextResponse.json({ success: true, data });
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: 'Server error' },
			{ status: 500 },
		);
	}
}
