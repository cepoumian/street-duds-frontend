import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import '../styles/nprogress.css';
import Layout from '../components/layout/Layout';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const startProgressBar = () => NProgress.start();
    const completeProgressBar = () => NProgress.done();

    router.events.on('routeChangeStart', startProgressBar);
    router.events.on('routeChangeComplete', completeProgressBar);
    Router.events.on('routeChangeError', completeProgressBar);

    return () => {
      router.events.off('routeChangeStart', startProgressBar);
      router.events.off('routeChangeComplete', completeProgressBar);
      Router.events.off('routeChangeError', completeProgressBar);
    };
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
