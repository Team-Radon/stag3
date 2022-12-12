import { ReactNode } from 'react';
// import { Toaster } from '@/ui/Toaster';
// import { Toaster } from 'react-hot-toast';
import Head from 'next/head'
import Footer from './Footer';
import NavBar from './NavBar';

interface Props {
  children: ReactNode
}

const SiteLayout = ({ children }: Props) => (
  <>
    {/* <Toaster /> */}
    <Head>
      <title>STAG3</title>
      <meta name="description" content="Stage web3 projects" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="static min-h-screen">
      <NavBar />
      {children}
      <Footer />
    </div>
  </>
);

export default SiteLayout;
