import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScroll } from "@/components/SmoothScroll";
import {DM_Sans} from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});
export const metadata = {
  title: "AI FAQ Chatbot | Intelligent Resolution",
  description: "Advanced FAQ resolution system with Groq, RAG, and premium UI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`min-h-full flex flex-col bg-white text-zinc-950 selection:bg-blue-600/10 selection:text-blue-600 overflow-x-hidden ${dmSans.className}`}>
        <div className="noise-overlay" />
        <SmoothScroll>
          <TooltipProvider>
            {children}
          </TooltipProvider>
          <Toaster />
        </SmoothScroll>
      </body>
    </html>
  );
}


