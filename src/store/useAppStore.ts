import create from 'zustand';
import { User } from '../helpers/interfaces';

interface AppState {
  showSidebar: boolean
  setShowSidebar: (showSidebar: boolean) => void
  showAuthModal: boolean
  setShowAuthModal: (showAuthModal: boolean) => void
  user: User | null
  setUser: (user: any | null) => void
  userLoading: boolean
  setUserLoading: (userLoading: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  showSidebar: false,
  setShowSidebar: (showSidebar) => set(() => ({ showSidebar })),
  showAuthModal: false,
  setShowAuthModal: (showAuthModal) => set(() => ({ showAuthModal })),
  user: null,
  setUser: (user) => set(() => ({ user })),
  userLoading: false,
  setUserLoading: (userLoading) => set(() => ({ userLoading }))
}));
