import type { Metadata, Viewport } from "next";
import { Anton, Chakra_Petch, JetBrains_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import { education, experience, profile } from "@/data/profile";
import "./globals.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const chakra = Chakra_Petch({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-chakra" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mayank-pillai.vercel.app"),
  title: "Mayank Pillai | AI Engineer",
  description:
    "Mayank Pillai, AI engineer and full-stack developer. LLM systems, Text-to-SQL, RAG and deployed Next.js products.",
  openGraph: {
    title: "Mayank Pillai | AI Engineer",
    description: "AI engineer and full-stack developer. LLM systems, Text-to-SQL, RAG and deployed Next.js products.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

// Structured data so search engines can show a proper result for the name
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "AI Engineer and Full-Stack Developer",
  url: "https://mayank-pillai.vercel.app",
  email: `mailto:${profile.links.email}`,
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.leetcode],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: education.school },
    { "@type": "CollegeOrUniversity", name: experience.org },
  ],
  knowsAbout: ["LLM systems", "Text-to-SQL", "Retrieval-augmented generation", "Next.js", "TypeScript", "Python", "PostgreSQL"],
};

export const viewport: Viewport = { themeColor: "#0b0b0f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${chakra.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
