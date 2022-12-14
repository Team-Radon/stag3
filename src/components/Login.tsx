import { ReactNode } from 'react';
import { User } from '../helpers/interfaces';
import { useOrbis } from '../orbis/useOrbis';
import { useAppStore } from '../store/useAppStore';
import { Button } from './UI/Button';

interface ConnectOptions {
  chain: 'ethereum' | 'solana'
  lit?: boolean
}

export const Login = ({ options, children, loading = false }: { options: ConnectOptions, children: ReactNode, loading?: boolean }) => {
  const orbis = useOrbis();
  const setUser = useAppStore((state) => state.setUser);
  const setUserLoading = useAppStore((state) => state.setUserLoading);

  const connect = async () => {
    setUserLoading(true);
    const res: User = await orbis.connect_v2({
      lit: true,
      provider: options.chain === 'ethereum' ? window?.ethereum : window?.phantom?.solana,
      ...options
    });

    if (res.status === 200) {
      setUser(res);
    } else {
      console.log(res);
    }

    setUserLoading(false);
  };

  return (
    <Button
      primary
      loading={loading}
      className="flex w-full justify-center uppercase"
      onClick={async () => await connect()}
    >
      {children}
    </Button>
  );
};
