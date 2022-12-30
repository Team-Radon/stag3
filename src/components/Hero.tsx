import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { Button } from './UI/Button';

const Hero = () => {
  const { push } = useRouter();

  return (
    <div className="mx-auto text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
        Your web3 product in the limelight
      </h1>
      <p className="w-3/4 mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl mx-auto">
        Present your web3 ideas and projects on Stag3 and get valuable feedback from fellow blockchain builders.
      </p>
      <div className="mt-5 sm:mt-8 flex justify-center">
        <div className="flex h-8 items-center gap-3">
          <Button size="lg" primary icon={<PlusCircleIcon className="w-6 h-6" />} onClick={async () => push('/add')}>Go on stage</Button>
        </div>
      </div>
    </div>
  )
}

export default Hero;
