import Image from 'next/image'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Button } from './UI/Button'
import { NavBarAccount } from './NavBarAccount';

const NavBar = () => (
  <div className="sticky top-0 z-10 flex shrink-0 justify-between items-center w-full border border-skin-border bg-skin-bg h-16 sm:h-auto px-4 sm:p-7 backdrop-blur">
    <div className="relative w-32">
      <Image src="https://i.imgur.com/Skr4I1Z.png" alt="brand" width={100} height={100} unoptimized />
    </div>
    <div className="flex flex-row gap-5 items-center">
      <div className="hidden md:flex h-8 items-center gap-3 border-r border-gray-300 pr-5">
        <Button icon={<PlusCircleIcon className="w-6 h-6" />}>
          Submit
        </Button>
      </div>
      <div className="flex relative">
        <NavBarAccount />
      </div>
    </div>
  </div>

)

export default NavBar;
