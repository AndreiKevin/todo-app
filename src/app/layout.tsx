import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../../contexts/AuthContext";

export const metadata: Metadata = {
  title: "To do app",
  description: "by Andrei",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
