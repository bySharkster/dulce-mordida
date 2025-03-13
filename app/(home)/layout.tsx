import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Toaster } from "sonner";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${siteConfig.metadata.title}`,
  description: siteConfig.metadata.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body className={inter.className}>
    <MainLayout>

        {children}
        <Toaster/>
    </MainLayout>

        </body>
    </html>
  );
}
