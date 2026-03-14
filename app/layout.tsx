import type { Metadata } from "next";
import { Rajdhani, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import "../components/styles/rankings.css";
import { ThemeProvider } from "../components/cfbpredictor-rankings/ThemeProvider";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "CFBPredictor.com — Power Rankings",
  description: "College football power rankings index",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var t = localStorage.getItem('cfbp-theme') === 'light' ? 'light' : 'dark';
              document.documentElement.setAttribute('data-theme', t);
              document.documentElement.style.backgroundColor = t === 'light' ? '#E8ECF4' : '#0B0E14';
            } catch(e) {}
          })();
        `}} />
      </head>
      <body
        className={`${rajdhani.variable} ${dmSans.variable} ${dmMono.variable}`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}