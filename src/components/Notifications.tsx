import { Notification } from '@/helpers/interfaces';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useUsername } from '@/hooks/useUsername';
import { useGetNotifications } from '@/orbis/useGetNotifications';
import { useAppStore } from '@/store/useAppStore';
import { Float } from '@headlessui-float/react';
import { Popover } from '@headlessui/react';
import { BellAlertIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import { AvatarUser } from './AvatarUser';
import { ButtonRounded } from './ButtonRounded';
import { LoadingSpinner } from './UI/LoadingSpinner';

const NotificationsItem = ({ notification }: { notification: Notification }) => {
  const { username } = useUsername(notification?.user_notifiying_details);

  return (
    <Popover.Button as="div">
      <div className="flex w-full cursor-pointer px-4 py-4 hover:bg-gray-100">
        <div className="hidden w-[78px] sm:block">
          <AvatarUser
            details={notification?.user_notifiying_details}
            size="44"
            className="-ml-2"
          />
        </div>
        <div className="w-full">
          <div className="flex leading-tight">
            <div className="max-w-[110px] truncate text-sm font-semibold">
              {username}
            </div>
          </div>
          <div className="leading-normal text-skin-text">
            <span className="text-sm">
              {notification?.family === 'follow'
                ? 'is following you'
                : notification?.family === 'reaction'
                  ? 'reacted on:'
                  : notification?.family === 'mention'
                    ? 'mentioned you on:'
                    : notification?.family === 'reply_to'
                      ? 'replied:'
                      : null}
            </span>
          </div>
          <div className="whitespace-normal truncate leading-tight text-gray-700 text-sm line-clamp-2">
            {notification?.post_details?.content?.body && (
              <>
                &ldquo;
                {notification?.post_details?.content?.body}
                &ldquo;
              </>
            )}
          </div>
        </div>
      </div>
    </Popover.Button>
  );
};

export const Notifications = () => {
  const user = useAppStore((state) => state.user);
  const [show, setShow] = useState<boolean>(false);
  const panelRef = useRef(null);

  useOnClickOutside(panelRef, () => setShow(false));

  const { data: notifications, isLoading } = useGetNotifications({
    did: user?.did
  });

  if (!user) {
    return null;
  }

  return (
    <Popover>
      <Float
        show={show}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        zIndex={50}
        offset={10}
        shift={16}
        flip={16}
        portal
        ref={panelRef}
      >
        <ButtonRounded
          className="hover:text-accent"
          onClick={() => setShow(!show)}
        >
          <BellAlertIcon className="h-[1.2em] w-[1.2em]" />
        </ButtonRounded>

        <Popover.Panel static className="w-screen outline-none sm:max-w-sm">
          <div className="overflow-hidden rounded-lg border border-skin-border bg-skin-header-bg shadow-lg outline-none">
            <div className="no-scrollbar max-h-[85vh] overflow-y-auto overscroll-contain">
              <div className="my-2 w-full">
                <div className="mb-3 flex items-center justify-between px-4 pt-2">
                  <div>Notifications</div>
                </div>

                {!notifications && isLoading
                  ? (
                    <LoadingSpinner />
                    )
                  : (
                    <div className="divide-y divide-skin-divider">
                      {notifications?.data?.map(
                        (notification, i: number) => (
                          <NotificationsItem
                            notification={notification}
                            key={i}
                          />
                        )
                      )}
                    </div>
                    )}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Float>
    </Popover>
  );
};
