// app/layout.js
//
// Every page on the site is placed inside this file's <main>. The header,
// footer and shopping state are defined once here rather than repeated.

import "./globals.css";
import { StoreProvider } from "../components/StoreProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { site } from "../lib/site-config";

// Used by Google and by link previews when someone shares the site.
export const metadata = {
  title: {
    default: "N2S Boutique | South Indian traditional wear in Prosper and Celina",
    template: "%s | N2S Boutique",
  },
  description:
    "N2S Boutique offers handpicked sarees, chudidhars, salwars and accessories for women and girls, serving Prosper, Celina and the surrounding North Dallas area.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const gaId = site.googleAnalyticsId;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />

        {/* Google Analytics loads only once you paste an ID into
            lib/site-config.js. Until then nothing is tracked. */}
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to main content</a>
        <StoreProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
