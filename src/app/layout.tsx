import type { Metadata } from "next";
import { FloatingContact } from "@/components/floating-contact";
import { SiteHeader } from "@/components/site-header";
import { SocialRail } from "@/components/social-rail";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nida Maryam | Portfolio",
  description: "Nida Maryam’s personal portfolio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col pb-24">
        <SiteHeader />
        <SocialRail />
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
