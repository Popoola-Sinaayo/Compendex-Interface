import MainHeader from "@/components/Header";
import MainLayout from "@/components/MainLayout";
import SEO from "@/components/SEO";

import { GlobalStyle } from "@/components/global_style";
import "@/styles/App.less";
import "@/styles/globals.css";
import { SSRProvider } from "@react-aria/ssr";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
if (!process.browser) React.useLayoutEffect = React.useEffect;
export default function App({ Component, pageProps }: AppProps) {
  const { name, description } = pageProps;
  return (
    <SSRProvider>
      <SEO
        name={name}
        description={description}
      />
      <MainLayout>
        <Head>
          <script src="/static/datafeeds/udf/dist/bundle.js" />
          <link rel="shortcut icon" href="/static/imgs/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat&family=Poppins:wght@500&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <GlobalStyle />
        <MainHeader />
        <Component {...pageProps} />
      </MainLayout>
    </SSRProvider>
  );
}
