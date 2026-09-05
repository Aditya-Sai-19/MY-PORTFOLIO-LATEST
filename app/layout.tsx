import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://aditya-sai.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Aditya Sai — AI/ML Engineer | Portfolio",
    template: "%s | Aditya Sai",
  },
  description:
    "Portfolio of Kolapalli Aditya Sai, an AI/ML Engineer at Kodryx AI in Hyderabad. Specializing in intelligent systems, applied machine learning, robotics, and cybersecurity. Building production-grade AI solutions.",
  keywords: [
    "Aditya Sai",
    "AI Engineer",
    "ML Engineer",
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "Robotics",
    "Cybersecurity",
    "Python",
    "TensorFlow",
    "PyTorch",
    "Computer Vision",
    "NLP",
    "Hyderabad",
    "India",
    "Kodryx AI",
    "Portfolio",
  ],
  authors: [{ name: "Kolapalli Aditya Sai" }],
  creator: "Kolapalli Aditya Sai",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aditya Sai — AI/ML Engineer",
    description:
      "Portfolio of Kolapalli Aditya Sai, an AI/ML Engineer at Kodryx AI. Building intelligent systems that bridge the physical and digital worlds.",
    url: SITE_URL,
    siteName: "Aditya Sai Portfolio",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "Aditya Sai — AI/ML Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Sai — AI/ML Engineer",
    description:
      "AI/ML Engineer at Kodryx AI. Building intelligent systems, robotics, and cybersecurity solutions.",
    images: ["/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    google: "google7efd2cd86a7f357c",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
