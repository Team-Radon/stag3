import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { Button } from './UI/Button';

const Hero = () => {
  const { push } = useRouter();

  return (
    <div className="mx-auto text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
        A stage built for
        {' '}
        <span className="text-indigo-600">Blockchain builders</span>
      </h1>
      <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
      </p>
      <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
        <div className="hidden md:flex h-8 items-center gap-3">
          <Button size="lg" primary icon={<PlusCircleIcon className="w-6 h-6" />} onClick={async () => push('/add')}>Go on stage</Button>
        </div>
      </div>
    </div>
  )
}

export default Hero;
