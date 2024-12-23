import { Navbar } from "@/components/navbar";
import { PocketBaseProvider } from "@/components/pocketbase-provider";
import { createServerClient } from "@/lib/pocketbase/server";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PocketBase + Next.js",
  description: "A simple example of PocketBase + Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = await createServerClient();

  return (
    <html
      lang="en"
      className={cn(geistSans.variable, geistMono.variable, "antialiased")}
      data-theme="lofi"
    >
      <body>
        <PocketBaseProvider
          initialToken={client.authStore.token}
          initialUser={client.authStore.record}
        >
          <Navbar />
          <div className="mx-auto max-w-xl px-4 py-8">{children}</div>
        </PocketBaseProvider>
      </body>
    </html>
  );
}
