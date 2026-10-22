import type { Metadata } from "next";
import { Geist, Cormorant_Garamond, Jost, Federo, Syncopate, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
// Home page type: geometric body, art nouveau display, wide caps labels, signature script.
const jost = Jost({ variable: "--font-jost", subsets: ["latin"] });
const federo = Federo({ variable: "--font-federo", subsets: ["latin"], weight: "400" });
const syncopate = Syncopate({ variable: "--font-syncopate", subsets: ["latin"], weight: ["400", "700"] });
const script = Mrs_Saint_Delafield({ variable: "--font-script", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Maison Aura | Fine Fragrance",
  description: "A demo perfume store: browse, wishlist, add to cart and check out.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${cormorant.variable} ${jost.variable} ${federo.variable} ${syncopate.variable} ${script.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SmoothScroll />
        <StoreProvider>
          <Header />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">{children}</main>
          <footer className="border-t border-line py-8 text-center text-sm text-muted">
            Maison Aura is a demo store. No real orders or payments.
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}
