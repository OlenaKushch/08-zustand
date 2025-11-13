import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
  title: "Welcome to NoteHub",
  description:
    "Creating, edinting, deleting, filtering of notes",
  openGraph: {
    title: 'NoteHub',
    description: 'Are you looking for the clear interface for writing, editing, and browsing notes? NoteHub offers a streamlined experience for anyone who values clarity and productivity.',
    url: 'https://notehub.com',
    images: [{
     url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
     alt:'notehub-logo',
     width: 1200,
     height: 630, 
    }],
  },
};

const robotoFont = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ['400','700'],
  display: 'swap',
  
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  
}: Readonly<{
  children: React.ReactNode;
  
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${robotoFont.variable}`}>
        <TanStackProvider>
          <Header />

          <main>
            {" "}
            {children}
            
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
