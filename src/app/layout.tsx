import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sharvarihupare.vercel.app"),
  title: "Sharvari Hupare | Software Development Engineer & Full-Stack AI Engineer",
  description:
    "Portfolio of Sharvari Hupare — Software Development Engineer specializing in scalable full-stack applications, payment systems (Razorpay, Cashfree), ABDM digital health stack, and AI architectures (FastAPI, Next.js, Gemini API, RAG).",
  keywords: [
    "Sharvari Hupare",
    "Software Development Engineer",
    "Full Stack Engineer",
    "Next.js",
    "React",
    "FastAPI",
    "TypeScript",
    "Python",
    "ABDM",
    "Fintech",
    "AI Engineer",
    "ClinicPilot",
    "KnowledgeFlow AI",
  ],
  authors: [{ name: "Sharvari Hupare", url: "https://github.com/sharvarihupare-369" }],
  creator: "Sharvari Hupare",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sharvarihupare.vercel.app",
    title: "Sharvari Hupare — Software Development Engineer",
    description:
      "Crafting resilient full-stack systems, mission-critical payment rails, and generative AI platforms.",
    siteName: "Sharvari Hupare Portfolio",
    images: [
      {
        url: "/sharvari.jpg",
        width: 1024,
        height: 1024,
        alt: "Sharvari Hupare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sharvari Hupare — Software Development Engineer",
    description:
      "Full-stack engineer with expertise in Next.js, TypeScript, Node.js, Python, and Generative AI.",
    images: ["/sharvari.jpg"],
  },
  icons: {
    icon: [
      { url: "/sharvari.jpg" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/sharvari.jpg" },
      { url: "/apple-icon.png", sizes: "192x192", type: "image/png" },
    ],
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
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="bg-[#140a06] text-[#fdfbf7] font-sans antialiased selection:bg-[#d85827]/40 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
