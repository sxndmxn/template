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
		<html lang="en">
			<body className="font-sans antialiased">
				<SidebarProvider
					style={
						{
							"--sidebar-width": "16rem",
						} as React.CSSProperties
					}
				>
					<AppSidebar />
					<SidebarInset>
						{children}
					</SidebarInset>
				</SidebarProvider>
			</body>
		</html>
	);
}
