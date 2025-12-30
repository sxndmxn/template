import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Full-Stack Template",
	description: "A modern .NET API + Next.js client template",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className="font-sans antialiased">
				{children}
			</body>
		</html>
	);
}
