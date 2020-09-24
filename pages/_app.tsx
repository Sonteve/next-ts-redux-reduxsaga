import { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
import wrapper from "../store/configureStore";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <>
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
    }
    body{
        padding: 0;
        margin: 0;
    }
`;