import Image from 'next/image'
import { PlusCircleIcon, ChatBubbleLeftRightIcon, HomeIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from './UI/Button'
import { NavBarAccount } from './NavBarAccount';

const NavBar = () => {
  const { push } = useRouter();
  return (
    <div className="sticky top-0 z-40 flex shrink-0 items-center w-full h-16 bg-[#e5e7eb]/70 sm:h-auto p-4 sm:p-6 backdrop-blur">
      <Link href="/" title="Home">
        <div className="brand flex items-center gap-2">
          <div className="relative w-10">
            <Image src="/stag3.svg" alt="brand" width={50} height={50} unoptimized />
          </div>
          <div className="text-4xl font-extrabold tracking-tight text-slate-800">stage</div>
        </div>
      </Link>
      <ul className="flex items-center gap-5 ml-auto mr-10">
        <li>
          <Link className="group flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-accent pr-5 border-r border-gray-300" href="/" title="Projects Page">
            <HomeIcon className="w-4 h-4 text-gray-500 group-hover:text-accent" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link className="group flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-accent pr-5 border-r border-gray-300" href="/discussions/" title="Discussions Page">
            <ChatBubbleLeftRightIcon className="w-4 h-4 text-gray-500 group-hover:text-accent" />
            <span>Discussions</span>
          </Link>
        </li>
        <li>
          <a className="group flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-accent" href="https://orbis.club/" title="Orbis Protocol" target="_blank" rel="noreferrer">
            <svg className="w-4 h-4 text-gray-500 group-hover:text-accent" viewBox="0 0 139 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M52.7051 1.48338C21.6591 9.00438 -0.0499138 36.7434 8.61901e-05 68.8264C0.0170862 80.2264 1.80309 88.5124 6.34109 98.2484C9.92309 105.931 17.4931 116.597 21.7311 119.931C24.2661 121.925 24.3311 122.27 24.4071 134.195C24.4811 145.786 24.6501 146.764 27.6801 153.16C31.9511 162.176 35.3371 166.432 42.3561 171.605C50.7601 177.799 59.5191 180.263 71.2981 179.746C79.0071 179.407 81.5701 178.834 87.2291 176.184C96.2111 171.979 100.484 168.588 105.674 161.545C112.03 152.921 114.37 144.35 113.769 131.886C113.3 122.133 113.316 122.047 116.001 120.063C119.692 117.334 127.567 106.687 131.162 99.5664C137.651 86.7104 139.848 67.4464 136.463 53.0844C130.608 28.2474 110.974 8.17938 86.3761 1.88838C77.2011 -0.457616 61.4981 -0.646616 52.7051 1.48338ZM87.4851 16.7424C95.1571 19.5334 105.922 26.8684 111.042 32.7944C116.18 38.7414 121.516 49.3394 123.02 56.5874C124.729 64.8174 123.801 80.0674 121.145 87.4164C119.082 93.1244 111.477 105.433 108.474 107.925C107.344 108.863 106.031 108.031 101.777 103.684C91.6781 93.3654 81.5001 89.4364 66.5561 90.0904C58.5431 90.4404 56.4541 90.9464 49.6281 94.1884C44.1981 96.7664 40.1511 99.6174 36.2571 103.605L30.6731 109.325L26.8001 104.871C21.7881 99.1084 16.4471 88.4584 14.9501 81.2454C13.2411 73.0154 14.1691 57.7654 16.8251 50.4164C19.6031 42.7314 26.9471 31.9614 32.8631 26.8954C38.6391 21.9504 47.0751 17.4014 54.0971 15.4454C62.0961 13.2174 79.6721 13.9004 87.4851 16.7424ZM83.8041 107.411C89.3501 110.433 95.4221 116.4 94.4881 117.911C94.1901 118.393 91.3681 119.809 88.2161 121.058C83.3191 122.999 80.5931 123.335 69.4851 123.37C58.3941 123.405 55.6121 123.082 50.5431 121.172C47.2751 119.94 44.2031 118.534 43.7161 118.047C42.1951 116.526 48.7811 110.176 55.2971 106.882C61.0621 103.967 62.0661 103.779 69.9851 104.133C77.0341 104.448 79.3931 105.008 83.8041 107.411ZM51.7031 135.972C65.4051 139.476 83.0131 138.262 95.3801 132.961L100.257 130.87L99.7651 137.743C98.9161 149.61 92.5681 158.471 81.1791 163.685C76.4661 165.842 74.7461 166.099 67.6331 165.709C54.8361 165.006 46.5281 159.692 41.0321 148.694C38.6751 143.978 37.9851 141.268 37.9851 136.731V130.865L41.0431 132.446C42.7251 133.316 47.5221 134.903 51.7031 135.972Z" />
            </svg>
            <span>Orbis Protocol</span>
            <ArrowTopRightOnSquareIcon className="w-3 h-3 invisible group-hover:visible" />
          </a>
        </li>
      </ul>
      <div className="flex flex-row gap-5 items-center">
        <div className="hidden md:flex h-8 items-center gap-3 border-r border-gray-300 pr-5">
          <Button primary icon={<PlusCircleIcon className="w-6 h-6" />} onClick={async () => push('/add')}>
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
