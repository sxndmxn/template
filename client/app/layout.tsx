import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
	title: "War Thunder - Aircraft Sensor Database",
	description: "Comprehensive aircraft radar and sensor data system for War Thunder",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className="dark">
			<body className="font-sans antialiased">
				<SiteHeader />
				{children}
			</body>
		</html>
	);
}
