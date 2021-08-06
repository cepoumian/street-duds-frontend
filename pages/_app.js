import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import '../styles/nprogress.css';
import '../styles/reset.css';
import { ApolloProvider } from '@apollo/client';
import CartStateProvider from '../lib/context/CartStateProvider';
import Layout from '../components/layout/Layout';
import withData from '../lib/withData';

function MyApp({ Component, pageProps, apollo }) {
  const router = useRouter();

  useEffect(() => {
    const startProgressBar = () => NProgress.start();
    const completeProgressBar = () => NProgress.done();

    router.events.on('routeChangeStart', startProgressBar);
    router.events.on('routeChangeComplete', completeProgressBar);
    router.events.on('routeChangeError', completeProgressBar);

    return () => {
      router.events.off('routeChangeStart', startProgressBar);
      router.events.off('routeChangeComplete', completeProgressBar);
      router.events.off('routeChangeError', completeProgressBar);
    };
  }, []);

  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartStateProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
