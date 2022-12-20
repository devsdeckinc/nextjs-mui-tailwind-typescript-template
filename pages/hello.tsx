import { Box, NoSsr } from "@mui/material";
import Link from "next/link";
import BrandingCssVarsProvider from "../src/BrandingCssVarsProvider";
import BrandingProvider from "../src/BrandingProvider";
import AppHeaderBanner from "../src/components/banner/AppHeaderBanner";
import NewsletterToast from "../src/components/home/NewsletterToast";
import AppHeader from "../src/layouts/AppHeader";
import Head from "../src/modules/components/Head";

export default function hello() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Escamenu"
        description="MUI provides a simple, customizable, and accessible library of React components. Follow your own design system, or start with Material Design."
      />
      <AppHeader />
      <Box p={20}>
        <div>We are on Hello Routed Page</div>
        <div>
          Go back to <Link href={"/"}>Home Page</Link>
        </div>
      </Box>
    </BrandingCssVarsProvider>
  );
}
