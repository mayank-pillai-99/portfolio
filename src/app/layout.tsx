import type { Metadata, Viewport } from "next";
import { Anton, Chakra_Petch, JetBrains_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const chakra = Chakra_Petch({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-chakra" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-eight-rosy-ujv4gja4nw.vercel.app"),
  title: "Mayank Pillai | AI Engineer",
  description:
    "Mayank Pillai, AI engineer and full-stack developer. LLM systems, Text-to-SQL, RAG and deployed Next.js products.",
  openGraph: {
    title: "Mayank Pillai | AI Engineer",
    description: "AI engineer and full-stack developer. LLM systems, Text-to-SQL, RAG and deployed Next.js products.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0b0b0f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${chakra.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
