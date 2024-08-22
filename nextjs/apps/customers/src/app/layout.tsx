import "@mantine/core/styles.css";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ColorSchemeScript } from "@mantine/core";

import App from "@/components/app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce website",
  description: "It's an e-commerce website",
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <App>{children}</App>
      </body>
    </html>
  );
};

export default Layout;
