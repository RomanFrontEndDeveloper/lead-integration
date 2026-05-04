'use client';

import { useState } from 'react';

export default function Home() {
	const [form, setForm] = useState({ name: '', phone: '' });
	const [startTime] = useState(Date.now());

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const res = await fetch('/api/lead', {
			method: 'POST',
			body: JSON.stringify({
				...form,
				website: '',
				timestamp: startTime,
			}),
		});

		const data = await res.json();
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
			<input
				placeholder='Ім’я'
				value={form.name}
				onChange={(e) => setForm({ ...form, name: e.target.value })}
			/>

			<input
				placeholder='+380XXXXXXXXX'
				value={form.phone}
				onChange={(e) => setForm({ ...form, phone: e.target.value })}
			/>

			{/* honeypot */}
			<input type='text' name='website' style={{ display: 'none' }} />

			<button type='submit'>Відправити</button>
		</form>
	);
}
