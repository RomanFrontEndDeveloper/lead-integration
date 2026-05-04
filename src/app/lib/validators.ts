export const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ\s]+$/;
export const phoneRegex = /^\+380\d{9}$/;

export const validateForm = (name: string, phone: string) => {
	const errors: { name?: string; phone?: string } = {};

	if (!nameRegex.test(name)) {
		errors.name = 'Тільки літери';
	}

	if (!phoneRegex.test(phone)) {
		errors.phone = 'Формат: +380XXXXXXXXX';
	}

	return errors;
};
