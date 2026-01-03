import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
// import { DefaultSeo } from "next-seo";
// import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'), // Replace with your actual domain
  title: {
    default: "Alex - AI Web Developer, agentic AI-Built | Custom AI-Powered Applications",
    template: "%s | Alex - AI Web Developer"
  },
  description: "Professional AI developer specializing in custom AI-powered web applications. Transform your business with intelligent chatbots, analytics dashboards, and automation solutions using Next.js, React, and cutting-edge AI technologies.",
  keywords: [
    "AI developer",
    "web development",
    "artificial intelligence",
    "machine learning",
    "chatbots",
    "Next.js",
    "React",
    "TypeScript",
    "AI-powered applications",
    "automation",
    "data analytics"
  ],
  authors: [{ name: "Alex", url: "https://your-domain.com" }],
  creator: "Alex",
  publisher: "Alex - AI Web Developer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Alex - AI Web Developer | Custom AI-Powered Applications",
    description: "Professional AI developer specializing in custom AI-powered web applications. Transform your business with intelligent solutions.",
    siteName: "Alex - AI Web Developer",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alex - AI Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex - AI Web Developer | Custom AI-Powered Applications",
    description: "Professional AI developer specializing in custom AI-powered web applications.",
    images: ["/og-image.jpg"],
    creator: "@your-twitter-handle", // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-site-verification", // Replace with your Google verification code
  },
  alternates: {
    canonical: "https://your-domain.com",
  },
};

// JSON-LD Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Alex - AI Web Developer",
  "description": "Professional AI developer specializing in custom AI-powered web applications",
  "url": "https://your-domain.com",
  "logo": "https://your-domain.com/logo.png",
  "sameAs": [
    "https://twitter.com/your-twitter-handle",
    "https://linkedin.com/in/your-linkedin",
    "https://github.com/your-github"
  ],
  "serviceType": "AI Development Services",
  "areaServed": "Global",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AI Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Chatbots & Virtual Assistants",
          "description": "Intelligent chatbots that handle customer support, lead qualification, and sales conversations 24/7"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Analytics Dashboards",
          "description": "Transform raw data into actionable insights using machine learning algorithms"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Workflow Automation",
          "description": "Intelligent workflow automation that eliminates repetitive tasks and boosts productivity"
        }
      }
    ]
  },
  "knowsAbout": [
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Data Analytics",
    "Chatbot Development",
    "Workflow Automation"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800`}
      >
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>

        {children}

        {/* Analytics */}
        <Analytics />

        {/* Default SEO configuration - temporarily removed */}
      </body>
    </html>
  );
}
