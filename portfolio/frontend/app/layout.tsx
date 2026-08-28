import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain-or-username.vercel.app"),
  title: "Okoth Reagan | Full-Stack Developer Portfolio",
  description:
    "Portfolio of Okoth Reagan, a full-stack developer and software engineering student specializing in Java, Flutter, Python, and cloud-based solutions.",
  authors: [{ name: "Okoth Reagan" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    title: "Okoth Reagan | Full-Stack Developer Portfolio",
    description:
      "Full-stack developer and software engineering student building reliable, scalable, user-focused applications.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
