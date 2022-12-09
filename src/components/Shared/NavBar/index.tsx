import Image from 'next/image'
import { PlusCircleIcon, WalletIcon } from '@heroicons/react/24/outline'

const NavBar = () => (
  <div className="sticky top-0 z-10 flex shrink-0 justify-between items-center w-full bg-gray-200/50 h-16 sm:h-auto px-4 sm:p-7 backdrop-blur">
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
)

export default NavBar;
