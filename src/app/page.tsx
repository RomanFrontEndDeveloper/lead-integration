'use client';

import { useState } from 'react';

export default function Home() {
	const [form, setForm] = useState({
		name: '',
		phone: '',
	});

	const [loading, setLoading] = useState(false);

	// час відкриття сторінки (антиспам)
	const [startTime] = useState(() => Date.now());

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// 🔴 проста валідація
		if (!form.name.trim() || !form.phone.trim()) {
			alert('Заповни всі поля');
			return;
		}

		setLoading(true);

		try {
			const res = await fetch('/api/lead', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: form.name.trim(),
					phone: form.phone.trim(),
					website: '', // honeypot
					timestamp: startTime,
				}),
			});

			const data = await res.json();

			if (data.success) {
				alert('Заявка відправлена ✅');
				setForm({ name: '', phone: '' });
			} else {
				alert('Помилка ❌');
			}
		} catch (err) {
			console.error(err);
			alert('Сервер недоступний ❌');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
			<input
				placeholder='Ім’я'
				value={form.name}
				onChange={(e) =>
					setForm((prev) => ({ ...prev, name: e.target.value }))
				}
			/>

			<input
				placeholder='+380XXXXXXXXX'
				value={form.phone}
				onChange={(e) =>
					setForm((prev) => ({ ...prev, phone: e.target.value }))
				}
			/>

			{/* honeypot поле (боти його заповнюють) */}
			<input
				type='text'
				name='website'
				autoComplete='off'
				style={{ display: 'none' }}
			/>

			<button type='submit' disabled={loading}>
				{loading ? 'Відправка...' : 'Відправити'}
			</button>
		</form>
	);
}
