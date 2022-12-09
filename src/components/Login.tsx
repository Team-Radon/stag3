import { ReactNode } from 'react';
import { User } from '../helpers/interfaces';
import { useOrbis } from '../orbis/useOrbis';

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
    <button type="submit" onClick={async () => await connect()}>
      {children}
    </button>
  );
};
