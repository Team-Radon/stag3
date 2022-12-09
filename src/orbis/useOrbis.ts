import { createContext, useContext } from 'react';

export const OrbisContext = createContext<any>(null);
export const useOrbis = () => useContext(OrbisContext);
