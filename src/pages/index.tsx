/* eslint-disable @next/next/no-img-element */

import Head from 'next/head'
import Footer from '../components/Shared/Footer'
import NavBar from '../components/Shared/NavBar'
import Hero from '../components/Home/Hero'
import Card from '../components/Shared/Card'
import ProfileList from '../components/Sidebar/ProfileList'

const Home = () => (
  <>
    <Head>
      <title>STAG3</title>
      <meta name="description" content="Stage web3 projects" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="static min-h-screen bg-gray-200">
      <NavBar />
      <main className="container mx-auto px-4 md:px-6 2xl:px-20">
        <Hero />
        <div className="space-y-10 lg:flex  lg:gap-20 lg:space-y-0">
          <ul className="list space-y-4 md:space-y-6 lg:w-2/3">
            <Card />
            <Card />
            <Card />
          </ul>
          <div className="sidebar lg:w-1/3">
            <ProfileList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </>
)
export default Home
