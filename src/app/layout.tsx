import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { env } from "@/env";
import { isClerkConfigured } from "@/server/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Witly QR",
    template: "%s | Witly QR",
  },
  description:
    "Multi-tenant QR menu, live table session, and split payment software for restaurants and cafes.",
  openGraph: {
    type: "website",
    title: "Witly QR",
    description:
      "Launch branded QR menus, live table sessions, and server-owned split payments.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Witly QR",
    description:
      "Launch branded QR menus, live table sessions, and server-owned split payments.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkEnabled = isClerkConfigured();

  return (
    <html
      lang="en"
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
