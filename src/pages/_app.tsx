import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Orbis } from '@orbisclub/orbis-sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import SiteLayout from '@/components/SiteLayout';
import { OrbisContext } from '../orbis/useOrbis';

const orbis = new Orbis({
  PINATA_API_KEY: process.env.PINATA_API_KEY,
  PINATA_SECRET_API_KEY: process.env.PINATA_SECRET_API_KEY,
  PINATA_GATEWAY: process.env.PINATA_GATEWAY
});

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (e) => {
        if ('message' in (e as Error)) {
          console.log((e as Error).message);
        }
      }
    },
    queries: {
      retry: false,
      staleTime: 60 * 1000 * 5
    }
  }
});

export default function App ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <OrbisContext.Provider value={orbis}>
        <ThemeProvider defaultTheme="light">
          <SiteLayout>
            <Component {...pageProps} />
          </SiteLayout>
        </ThemeProvider>
      </OrbisContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
