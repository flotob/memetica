import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';
import { PrivyProvider } from '@/components/PrivyProvider';
import { UserProfile } from '@/components/UserProfile';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <PrivyProvider>
          <div className="relative min-h-screen">
            <header className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-3xl font-bold text-white">
                  Memetica
                </Link>
                <div className="flex items-center gap-4">
                  <Link href="/minds" className="text-gray-300 hover:text-white h-10 flex items-center">
                    Explore
                  </Link>
                  <Link href="/minds/create" className="h-10 flex items-center px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                    Add Mind
                  </Link>
                  <div className="h-10">
                    <UserProfile />
                  </div>
                </div>
              </div>
            </header>
            {children}
          </div>
        </PrivyProvider>
      </body>
    </html>
  );
}
