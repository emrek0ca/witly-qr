import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { isClerkConfigured } from "@/server/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Witly QR",
  description: "Multi-tenant QR menu and table-session SaaS for restaurants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkEnabled = isClerkConfigured();

  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {clerkEnabled ? <ClerkWrapper>{children}</ClerkWrapper> : children}
      </body>
    </html>
  );
}

async function ClerkWrapper({ children }: { children: React.ReactNode }) {
  const { ClerkProvider } = await import("@clerk/nextjs");

  return <ClerkProvider>{children}</ClerkProvider>;
}
