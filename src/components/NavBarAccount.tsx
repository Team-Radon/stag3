import { WalletIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { User } from '../helpers/interfaces';
import { useHasMounted } from '../hooks/useHasMounted';
import { useUsername } from '../hooks/useUsername';
import { useOrbis } from '../orbis/useOrbis';
import { useAppStore } from '../store/useAppStore';
import { AvatarUser } from './AvatarUser';
import { Login } from './Login';
import { MenuAccount } from './MenuAccount';
import { Modal } from './Modal';
import { Button } from './UI/Button';

export const NavBarAccount = () => {
  const showAuthModal = useAppStore((state) => state.showAuthModal);
  const setShowAuthModal = useAppStore((state) => state.setShowAuthModal);
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const userLoading = useAppStore((state) => state.userLoading);
  const setUserLoading = useAppStore((state) => state.setUserLoading);

  const { username } = useUsername(user?.details);
  const hasMounted = useHasMounted();

  const orbis = useOrbis();

  const checkUserConnection = async () => {
    setUserLoading(true);
    const res: User = await orbis.isConnected();

    if (res.status === 200 && res.details) {
      setUser(res);
    }

    setUserLoading(false);
  };

  useEffect(() => {
    if (!user) {
      checkUserConnection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return !user && userLoading
    ? (
      <Button loading>Connect</Button>
      )
    : user
      ? (
        <MenuAccount>
          <AvatarUser
            details={user?.details}
            size="18"
            className="-mr-1 -ml-1 sm:mr-2 md:mr-2 lg:mr-2 xl:mr-2"
          />
          <span className="hidden sm:block">{username}</span>
        </MenuAccount>
        )
      : (
        <>
          <Button
            icon={<WalletIcon className="w-6 h-6" />}
            className="uppercase"
            onClick={() => setShowAuthModal(true)}
          >
            Connect wallet
          </Button>
          {hasMounted && (
          <Modal
            title="Connect to Stage"
            open={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          >
            <div className="m-4 space-y-2">
              <Login
                options={{
                  chain: 'ethereum'
                }}
              >
                Connect to metamask
              </Login>

              <Login
                options={{
                  chain: 'solana'
                }}
              >
                Connect to phantom wallet
              </Login>
            </div>
          </Modal>
          )}
        </>
        )
};
