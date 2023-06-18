import Nav from "@/components/Nav";
import "@/styles/globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

import { Playfair_Display } from "next/font/google";

const font = Playfair_Display({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-alabaster ${font.className}`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
