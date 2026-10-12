import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: [
    { path: "../public/fonts/Inter-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/Inter-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Addis Eats | Ethiopian food delivery", template: "%s | Addis Eats" },
  description: "Discover Ethiopian favorites, follow deliveries, and review Addis Eats order progress.",
  openGraph: { type: "website", siteName: "Addis Eats", title: "Addis Eats Delivery", description: "A warm taste of Ethiopia, delivered to your door." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const analyticsSrc = process.env.NEXT_PUBLIC_ANALYTICS_SRC;
  return <html lang="en" className={inter.variable}>
    <body>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="header">
        <Link href="/" className="brand" aria-label="Addis Eats home"><span className="brand-icon" aria-hidden="true">A</span><span><b>Addis Eats</b><small>ETHIOPIAN KITCHEN</small></span></Link>
        <nav aria-label="Main navigation"><Link href="/">Overview</Link><Link href="/delivery/AE-2048">Track delivery</Link></nav>
      </header>
      <div id="main-content">{children}</div>
      <footer className="footer"><b>Addis Eats</b><span>Good food. Warm welcome. Ethiopian roots.</span></footer>
      {analyticsSrc ? <Script src={analyticsSrc} strategy="lazyOnload" /> : null}
    </body>
  </html>;
}
