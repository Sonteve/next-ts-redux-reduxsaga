import { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
import wrapper from "../store/configureStore";
import Head from "next/head";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <>
      <Head>
        <title>Agripa</title>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
        </style>
      </Head>
      <GlobalStyle></GlobalStyle>
      <Component {...pageProps} />
    </>
  );
};

MyApp.getInitialProps = async ({
  Component,
  ctx,
}: AppContext): Promise<AppInitialProps> => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default wrapper.withRedux(MyApp);

const GlobalStyle = createGlobalStyle`
    html {
        padding: 0;
        margin: 0;     
        font-size: 10px;   
        font-family: 'Noto Sans KR', sans-serif;
    }
    body{
        padding: 0;
        margin: 0;
    }
    ul,li{
      list-style:none;
      margin:0;
      padding: 0;
    }
`;
