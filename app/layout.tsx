import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BitStats — Bitcoin Identity Layer",
  description: "Self-sovereign identity and ZK credentials on Stacks. BNS is your identity root.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M50 6 L94 88 H74 L50 46 L26 88 H6 Z' fill='none' stroke='%230A2463' stroke-width='8' stroke-linejoin='miter'/><path d='M28 68 H72' stroke='%230A2463' stroke-width='8' stroke-linecap='square'/><path d='M60 88 H92 L82 68 H72' fill='none' stroke='%230A2463' stroke-width='8' stroke-linejoin='miter' stroke-linecap='square'/></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
