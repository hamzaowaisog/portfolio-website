import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Hamza — Full-Stack Platform Engineer",
  description:
    "I build resilient, cross-platform product systems — translating complex business operations into elegant web and mobile architecture. React Native, .NET, Next.js, FastAPI, RAG.",
  keywords: [
    "Platform Engineer",
    "Full-Stack Developer",
    "React Native",
    "ASP.NET Core",
    "Next.js",
    "FastAPI",
    "RAG",
    "Mobile Engineer",
    "Backend Engineer",
    "Muhammad Hamza",
  ],
  authors: [{ name: "Muhammad Hamza" }],
  openGraph: {
    title: "Muhammad Hamza — Full-Stack Platform Engineer",
    description:
      "Cross-platform product systems for agritech, healthcare, and enterprise AI. React Native, .NET, Next.js, RAG pipelines.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Hamza — Full-Stack Platform Engineer",
    description:
      "Cross-platform product systems for agritech, healthcare, and enterprise AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} bg-bg text-text-primary antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
