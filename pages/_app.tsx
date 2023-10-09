import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { AppProps } from 'next/dist/shared/lib/router/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ColorModeScript } from 'nextjs-color-mode';
import React, { PropsWithChildren, useCallback } from 'react';
import { TinaEditProvider } from 'tinacms/dist/edit-state';

import Footer from 'components/Footer';
import { GlobalStyle } from 'components/GlobalStyles';
import Navbar from 'components/Navbar';
import NavigationDrawer from 'components/NavigationDrawer';
import NewsletterModal from 'components/Modals/NewsletterModal';
import WaveCta from 'components/WaveCta';
import { NavItems } from 'types';
import { Modal, ModalContextProvider, useModalContext } from '../contexts/modal.context';
import LoginModal from '../components/Modals/LoginModal';
import SignupModal from '../components/Modals/SignupModal';
import { AuthContextProvider } from '../contexts/auth.context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MixpanelProvider } from '../contexts/mixpanel.context';

const navItems: NavItems = [
  { title: 'Features', href: '/features' },
  { title: 'Pricing', href: '/pricing' },
  { title: 'Request a Demo', href: '/request-demo' },
  { title: 'Log in', href: '/log-in', login: true },
  { title: 'Log out', href: '/log-out', logout: true },
];

const TinaCMS = dynamic(() => import('tinacms'), { ssr: false });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
        <link rel='icon' type='image/png' href='/favicon.png' />
        {/* <link rel="alternate" type="application/rss+xml" href={EnvVars.URL + 'rss'} title="RSS 2.0" /> */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
          ga('create', 'UA-117119829-1', 'auto');
          ga('send', 'pageview');`,
          }}
        /> */}
        {/* <script async src="https://www.google-analytics.com/analytics.js"></script> */}
      </Head>
      <ColorModeScript />
      <GlobalStyle />

      <Providers>
        <Modals />
        <Navbar items={navItems} />
        <TinaEditProvider
          editMode={
            <TinaCMS
              query={pageProps.query}
              variables={pageProps.variables}
              data={pageProps.data}
              isLocalClient={!process.env.NEXT_PUBLIC_TINA_CLIENT_ID}
              branch={process.env.NEXT_PUBLIC_EDIT_BRANCH}
              clientId={process.env.NEXT_PUBLIC_TINA_CLIENT_ID}
              {...pageProps}
            >
              {(livePageProps: any) => <Component {...livePageProps} />}
            </TinaCMS>
          }
        >
          <Component {...pageProps} />
        </TinaEditProvider>
        <WaveCta />
        <Footer />
      </Providers>
    </>
  );
}

function Providers<T>({ children }: PropsWithChildren<T>) {
  return (
    <QueryClientProvider client={queryClient}>
      <MixpanelProvider>
        <AuthContextProvider>
          <ModalContextProvider>
            <NavigationDrawer items={navItems}>{children}</NavigationDrawer>
          </ModalContextProvider>
        </AuthContextProvider>
      </MixpanelProvider>
    </QueryClientProvider>
  );
}

function Modals() {
  const { modalOpened, setModalOpened } = useModalContext();

  const closeModal = useCallback(() => {
    setModalOpened(null);
  }, []);

  switch (modalOpened) {
    case Modal.Login:
      return <LoginModal onClose={closeModal} />;
    case Modal.SignUp:
      return <SignupModal onClose={closeModal} />;
    case Modal.Newsletter:
      return <NewsletterModal onClose={closeModal} />;
  }

  return null;
}

export default MyApp;
