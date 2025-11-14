// /src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SystemProvider } from "@/context/SystemContext"; // Impor provider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Sistem Informasi Dishub",
	description: "Sistem Informasi Dinas Perhubungan",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<SystemProvider>{children}</SystemProvider> {/* Bungkus di sini */}
			</body>
		</html>
	);
}
