import { WalletIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';
import { User } from '../helpers/interfaces';
import { useOrbis } from '../orbis/useOrbis';
import { Button } from './UI/Button';

interface ConnectOptions {
  provider: any
  chain: 'ethereum' | 'solana'
  lit?: boolean
}

export const Login = ({ options, children }: { options: ConnectOptions, children: ReactNode }) => {
  const orbis = useOrbis();

  const connect = async () => {
    const res: User = await orbis.connect_v2({
      lit: true,
      ...options
    });

    if (res.status === 200) {
      console.log(res)
    } else {
      console.error(res);
    }
  };

  return (
    <Button
      icon={<WalletIcon className="w-6 h-6" />}
      className="uppercase"
      onClick={async () => await connect()}
    >
      {children}
    </Button>
  );
};
