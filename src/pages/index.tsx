/* eslint-disable @next/next/no-img-element */

import Head from 'next/head'
import { ProductItem } from '../components/ProductItem'
import { ActiveUsers } from '../components/ActiveUsers'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import { GitCredentials } from '../components/GitCredentials'

const Home = () => (
  <>
    <Head>
      <title>STAG3</title>
      <meta name="description" content="Stage web3 projects" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="static min-h-screen">
      <NavBar />
      <main className="container mx-auto px-4 md:px-6 2xl:px-20">
        <Hero />
        <div className="space-y-10 lg:flex  lg:gap-20 lg:space-y-0">
          <ul className="list space-y-4 md:space-y-6 lg:w-2/3">
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
          </ul>
          <div className="sidebar lg:w-1/3">
            <ActiveUsers />
            <GitCredentials />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  </>
)
export default Home
