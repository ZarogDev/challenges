import { createContext, useContext } from 'react';
import type { Authcontext } from '../@types';

export const AuthContext = createContext<Authcontext | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}