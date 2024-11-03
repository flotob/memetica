import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: "Memetica",
  description: "Create, share, and interact with AI minds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
