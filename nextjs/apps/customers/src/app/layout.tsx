import "@mantine/core/styles.css";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ColorSchemeScript } from "@mantine/core";

import App from "@/components/app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mila Shop",
  description: "Vietnamese Mila Shop",
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
