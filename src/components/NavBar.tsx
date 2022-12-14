import Image from 'next/image'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from './UI/Button'
import { NavBarAccount } from './NavBarAccount';

const NavBar = () => {
  const { push } = useRouter();
  return (
    <div className="sticky top-0 z-40 flex shrink-0 justify-between items-center w-full h-16 bg-[#e5e7eb]/70 sm:h-auto p-4 sm:p-6 backdrop-blur">
      <Link href="/" title="Home">
        <div className="brand flex items-center gap-2">
          <div className="relative w-10">
            <Image src="/stag3.svg" alt="brand" width={50} height={50} unoptimized />
          </div>
          <div className="text-4xl font-extrabold tracking-tight text-slate-800">stage</div>
        </div>
      </Link>
      <div className="flex flex-row gap-5 items-center">
        <div className="hidden md:flex h-8 items-center gap-3 border-r border-gray-300 pr-5">
          <Button icon={<PlusCircleIcon className="w-6 h-6" />} onClick={async () => push('/add')}>
            Submit
          </Button>
        </div>
        <div className="flex relative">
          <NavBarAccount />
        </div>
      </div>
    </div>

  );
}

export default NavBar;
