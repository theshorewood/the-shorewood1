import { Smooch_Sans } from "next/font/google";
import "./globals.css";
import AuroraBackground from "./components/AuroraBackground";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Script from "next/script";
import LoadingScreen from "./components/LoadingScreen";
import Chatbot from "./components/Chatbot";

const smooch = Smooch_Sans({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "The Shorewood | Luxury Kashmir Travel & Stays",
  description:
    "Experience luxury stays, curated Kashmir tours and unforgettable journeys with The Shorewood.",
  keywords: [
    "The Shorewood",
    "Luxury Kashmir Travel",
    "Kashmir luxury stays",
    "Kashmir tour itineraries",
    "Gulmarg luxury hotels",
    "Pahalgam travel"
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "The Shorewood | Where Nature Finds Luxury",
    description:
      "Discover Kashmir through luxury stays, private journeys and unforgettable experiences.",
    url: "https://www.theshorewood.com",
    siteName: "The Shorewood",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
       {/* Made by  Haroon Rashid & Rayyan Lone */}
      <body className={`${smooch.className} bg-sand text-[#191919] antialiased`}>
        <LoadingScreen />
        <AuroraBackground />
        <Navbar />
        {children}
         <Chatbot />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VN5K74QKT5"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-VN5K74QKT5');
    `}
        </Script>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>

    </html>
  );
}