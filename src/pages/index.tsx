
import Head from 'next/head'
import Image from 'next/image'
import { HandThumbUpIcon } from '@heroicons/react/24/solid'
import { PlusCircleIcon, WalletIcon } from '@heroicons/react/24/outline'

const Home = () => (
  <>
    <Head>
      <title>STAG3</title>
      <meta name="description" content="Stage web3 projects" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="static flex flex-col min-h-screen bg-[#EAEBEE]">
      <div className="sticky top-0 z-10 flex shrink-0 justify-between items-center w-full bg-[#EAEBEE]/70 h-16 sm:h-auto px-4 sm:p-7 backdrop-blur">
        <div className="relative w-32">
          <Image src="https://i.imgur.com/Skr4I1Z.png" alt="brand" width={100} height={100} unoptimized />
        </div>
        <div className="flex flex-row gap-5 items-center">
          <div className="hidden md:flex h-8 items-center gap-3 border-r border-gray-300 pr-5">
            <button
              type="button"
              className="h-10 border border-gray-200 flex flex-row items-center justify-center gap-2 rounded-full box-border transition-all text-sm relative px-4 hover:bg-gray-50 cursor-pointer select-none"
            >
              <PlusCircleIcon className="w-6 h-6" />
              <div className="text-sm">Submit</div>
            </button>
          </div>
          <div className="flex relative">
            <button type="button" className="h-10 border border-gray-200 flex flex-row items-center gap-2 rounded-full box-border transition-all hover:shadow bg-gray-800 hover:bg-gray-900 px-4">
              <WalletIcon className="text-white w-6 h-6" />
              <div className="text-white text-xs uppercase tracking-wide px-1">Connect Wallet</div>
            </button>
          </div>
        </div>
      </div>
      <main className="px-4 md:px-6 2xl:px-28 pb-8 container mx-auto min-h-min flex-1">
        <div className="mx-auto py-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="block">A stage built for Blockchain builders</span>
              </h2>
              <p className="mt-4 text-lg leading-6">
                Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla
                nec.
              </p>
              <a
                href="#"
                className="mt-8 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base text-white font-medium shadow hover:bg-indigo-700"
              >
                Go on stage
              </a>
            </div>
          </div>
        </div>
        <div className="lg:flex lg:gap-40">
          <div className="w-2/3 list space-y-6">
            <div className="card prose max-w-none flex w-full p-4 sm:p-6 sm:pt-5 bg-white text-slate-600 rounded-xl md:rounded-2xl md:shadow">
              <div className="card-main">
                <div className="card-top mb-10">
                  <div className="text-2xl mb-2">Project Name</div>
                  <div className="text-sm">Duis quis deserunt adipisicing mollit elit do cillum elit</div>
                </div>
                <div className="content mb-10">
                  Proident reprehenderit id velit commodo. Est commodo labore dolore eu reprehenderit sit. Duis velit tempor officia esse quis laborum aliqua sint voluptate do laborum nulla in. Proident consectetur consequat qui anim amet pariatur excepteur.
                </div>
                <div className="team-info flex items-center gap-10 mb-8">
                  <div className="creator flex gap-2 items-center">
                    <div className="shrink-0 bg-gray-200 border-gray-300 w-6 h-6 rounded-full" />
                    <div className="text-sm">Creator</div>
                  </div>
                  <div className="members flex items-center gap-2">
                    <div className="shrink-0 bg-gray-200 border border-gray-300 w-6 h-6 rounded-full" />
                    <div className="shrink-0 bg-gray-200 border border-gray-300 w-6 h-6 rounded-full" />
                    <div className="shrink-0 bg-gray-200 border border-gray-300 w-6 h-6 rounded-full" />
                    <div className="text-sm">+3 others</div>
                  </div>
                </div>
                <div className="category-chips flex items-center gap-4">
                  <div className="chips inline-flex px-4 py-1 rounded-full bg-gray-200 text-sm">DeFi</div>
                  <div className="chips inline-flex px-4 py-1 rounded-full bg-gray-200 text-sm">Gaming</div>
                </div>
              </div>
              <div className="card-vote shrink-0">
                <div className="text-center px-4 py-2 border">
                  <HandThumbUpIcon className="w-6 h-6" />
                  <span className="text-sm">42</span>
                </div>
              </div>
            </div>
            <div className="card prose max-w-none flex w-full p-4 sm:p-6 sm:pt-5 bg-white text-slate-600 rounded-xl md:rounded-2xl md:shadow">
              <div className="card-main">
                <div className="card-top mb-10">
                  <div className="text-2xl mb-2">Project Name</div>
                  <div className="text-sm">Duis quis deserunt adipisicing mollit elit do cillum elit</div>
                </div>
                <div className="content mb-10">
                  Proident reprehenderit id velit commodo. Est commodo labore dolore eu reprehenderit sit. Duis velit tempor officia esse quis laborum aliqua sint voluptate do laborum nulla in. Proident consectetur consequat qui anim amet pariatur excepteur.
                </div>
                <div className="team-info flex items-center gap-10 mb-8">
                  <div className="creator flex gap-2 items-center">
                    <div className="shrink-0 bg-gray-200 border-gray-300 w-6 h-6 rounded-full" />
                    <div className="text-sm">Creator</div>
                  </div>
                  <div className="members flex items-center gap-2">
                    <div className="shrink-0 bg-gray-200 border border-gray-300 w-6 h-6 rounded-full" />
                    <div className="shrink-0 bg-gray-200 border border-gray-300 w-6 h-6 rounded-full" />
                    <div className="shrink-0 bg-gray-200 border border-gray-300 w-6 h-6 rounded-full" />
                    <div className="text-sm">+3 others</div>
                  </div>
                </div>
                <div className="category-chips flex items-center gap-4">
                  <div className="chips inline-flex px-4 py-1 rounded-full bg-gray-200 text-sm">DeFi</div>
                  <div className="chips inline-flex px-4 py-1 rounded-full bg-gray-200 text-sm">Gaming</div>
                </div>
              </div>
              <div className="card-vote shrink-0">
                <div className="text-center px-4 py-2 border">
                  <HandThumbUpIcon className="w-6 h-6" />
                  <span className="text-sm">42</span>
                </div>
              </div>
            </div>
            <div className="card prose max-w-none flex w-full p-4 sm:p-6 sm:pt-5 bg-white text-slate-600 rounded-xl md:rounded-2xl md:shadow">
              <div className="card-main">
                <div className="card-top mb-10">
                  <div className="text-2xl mb-2">Project Name</div>
                  <div className="text-sm">Duis quis deserunt adipisicing mollit elit do cillum elit</div>
                </div>
                <div className="content mb-10">
                  Proident reprehenderit id velit commodo. Est commodo labore dolore eu reprehenderit sit. Duis velit tempor officia esse quis laborum aliqua sint voluptate do laborum nulla in. Proident consectetur consequat qui anim amet pariatur excepteur.
                </div>
                <div className="team-info flex items-center gap-10 mb-8">
                  <div className="creator flex gap-2 items-center">
                    <div className="shrink-0 bg-gray-200 border-gray-300 w-6 h-6 rounded-full" />
                    <div className="text-sm">Creator</div>
                  </div>
                  <div className="members flex items-center gap-2">
                    <div className="shrink-0 bg-gray-200 border border-gray-300 w-6 h-6 rounded-full" />
                    <div className="shrink-0 bg-gray-200 border border-gray-300 w-6 h-6 rounded-full" />
                    <div className="shrink-0 bg-gray-200 border border-gray-300 w-6 h-6 rounded-full" />
                    <div className="text-sm">+3 others</div>
                  </div>
                </div>
                <div className="category-chips flex items-center gap-4">
                  <div className="chips inline-flex px-4 py-1 rounded-full bg-gray-200 text-sm">DeFi</div>
                  <div className="chips inline-flex px-4 py-1 rounded-full bg-gray-200 text-sm">Gaming</div>
                </div>
              </div>
              <div className="card-vote shrink-0">
                <div className="text-center px-4 py-2 border">
                  <HandThumbUpIcon className="w-6 h-6" />
                  <span className="text-sm">42</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/3 sidebar">
            <div className="w-full h-[500px] aspect-square bg-white rounded-xl md:rounded-2xl md:shadow" />
          </div>
        </div>
      </main>
      <footer className="hidden sm:flex w-full px-8 py-4 justify-between items-center flex-col md:flex-row">
        <div className="text-gray-600 text-sm">© 2022</div>
        <div className="flex items-center">
          <a href="#" title="Discord Server" className="text-gray-600 mx-2 md:mx-0 hover:underline text-sm">Discord</a>
          <a href="#" title="Twitter Profile" className="text-gray-600 mx-2 md:ml-4 md:mx-0 hover:underline text-sm">Twitter</a>
        </div>
      </footer>
    </div>
  </>
)
export default Home
