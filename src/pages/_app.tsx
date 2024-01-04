import MainHeader from "@/components/Header";
import MainLayout from "@/components/MainLayout";
import SEO from "@/components/SEO";
import NextNProgress from "nextjs-progressbar";
import { GlobalStyle } from "@/components/global_style";
import "@/styles/App.less";
import "@/styles/globals.css";
import { SSRProvider } from "@react-aria/ssr";
import type { AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import {
  Button,
  Group,
  Modal,
  useMantineTheme,
  Text,
  Checkbox,
  ScrollArea,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getCookie, setCookie } from "cookies-next";
if (!process.browser) React.useLayoutEffect = React.useEffect;
export default function App({ Component, pageProps }: AppProps) {
  const { name, description, image } = pageProps;
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState<boolean>(false);
  const theme = useMantineTheme();
  useEffect(() => {
    const acceptedTerms = getCookie("accepted");
    if (typeof window !== undefined && !acceptedTerms) {
      open();
    }
  }, []);
  const handleAcceptTerms = () => {
    if (checked) {
      setCookie("accepted", true);
      close();
    }
  };
  return (
    <SSRProvider>
      <SEO name={name} description={description} image={image} />
      <NextNProgress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
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
