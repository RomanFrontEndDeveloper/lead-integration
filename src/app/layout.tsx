import './globals.css';

export const metadata = {
	title: 'Lead Integration',
	description: 'Form + API integration (SalesDrive + Dilovod)',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='uk'>
			<body>
				<main className='app-container'>{children}</main>
			</body>
		</html>
	);
}
