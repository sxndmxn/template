import type { Metadata } from "next";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

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
				<SidebarProvider>
					<AppSidebar />
					<SidebarInset>
						{children}
					</SidebarInset>
				</SidebarProvider>
			</body>
		</html>
	);
}
