import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-primary-gray overflow-y-hidden">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
