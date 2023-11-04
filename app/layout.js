"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import TopNav from "@/components/TopNav";
import { SessionProvider } from "next-auth/react";
import dotenv from "dotenv";

dotenv.config();
const inter = Inter({ subsets: ["latin"] });

// client components cannot have any metadata
export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<SessionProvider>
					<TopNav />
					{children}
					<Toaster />
				</SessionProvider>
			</body>
		</html>
	);
}
