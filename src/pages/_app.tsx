import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Orbis } from '@orbisclub/orbis-sdk';
import { OrbisContext } from '../orbis/useOrbis';

const orbis = new Orbis();

export default function App ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <OrbisContext.Provider value={orbis}>
      <Component {...pageProps} />
    </OrbisContext.Provider>
  );
}
