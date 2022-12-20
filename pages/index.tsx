import * as React from "react";
import Head from "../src/modules/components/Head";
import NoSsr from "@mui/material/NoSsr";
import Divider from "@mui/material/Divider";
import AppHeader from "../src/layouts/AppHeader";
import AppFooter from "../src/layouts/AppFooter";
import BrandingCssVarsProvider from "../src/BrandingCssVarsProvider";
import NewsletterToast from "../src/components/home/NewsletterToast";
import AppHeaderBanner from "../src/components/banner/AppHeaderBanner";

export default function Home() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Escamenu"
        description="MUI provides a simple, customizable, and accessible library of React components. Follow your own design system, or start with Material Design."
      />
      <NoSsr>
        <NewsletterToast />
      </NoSsr>
      <AppHeaderBanner />
      <AppHeader />
      <main id="main-content">
        <Divider />
      </main>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
{
  "@context": "https://schema.org",
  "@type": "Escamenu",
  "name": "esca",
  "url": "https://escamenu.com/",
  "logo": "https://www.escamenu.com/static/media/escacointoken.deb98e59f191dbb19c71.png",
  "sameAs": [
    "https://www.instagram.com/escamenu/",
    "https://twitter.com/EscaMenu",
    "https://www.facebook.com/escacontactless"
  ]
}
          `,
        }}
      />
    </BrandingCssVarsProvider>
  );
}
