import { ReactNode } from 'react';
import Head from 'next/head'
import Footer from './Footer';
import NavBar from './NavBar';
import { Toaster } from './UI/Toaster';

interface Props {
  children: ReactNode
}

const SiteLayout = ({ children }: Props) => (
  <>
    <Head>
      <title>STAG3</title>
      <meta name="description" content="Stage web3 projects" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="static flex flex-col min-h-screen">
      <Toaster />
      <NavBar />
      {children}
      <Footer />
    </div>
  </>
);

export default SiteLayout;
