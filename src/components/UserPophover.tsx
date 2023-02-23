/* eslint-disable @typescript-eslint/no-explicit-any */
import { Popover } from '@headlessui/react';
import { useRef, useState } from 'react';
import { Float } from '@headlessui-float/react';
import { shorten } from '@/helpers/utils';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { Details } from '@/helpers/interfaces';
import { useUsername } from '@/hooks/useUsername';
import { useCopy } from '@/hooks/useCopy';
import { useRouter } from 'next/router';
import { AvatarUser } from './AvatarUser';
import { Button } from './UI/Button';
import { ButtonFollow } from './ButtonFollow';
import { BaseUser } from './BaseUser';

interface Props {
  iconOnly?: boolean
  userOnly?: boolean
  iconUser?: boolean
}

export const UserPophover = ({
  details,
  iconOnly,
  userOnly,
  iconUser
}: Props & { details: Details }) => {
  const [show, setShow] = useState<boolean>(false);
  const timerOpen = useRef<any>(null);
  const timerClose = useRef<any>(null);
  const { copyToClipboard } = useCopy();

  const { username } = useUsername(details);
  const { push } = useRouter();

  const open = () => {
    if (timerClose.current !== null) {
      clearTimeout(timerClose.current);
      timerClose.current = null;
    }
    timerOpen.current = setTimeout(() => {
      setShow(true);
    }, 200);
  };

  const delayClose = () => {
    if (timerOpen.current !== null) {
      clearTimeout(timerOpen.current);
      timerOpen.current = null;
    }
    timerClose.current = setTimeout(() => {
      setShow(false);
    }, 150);
  };

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
      >
        <Popover.Button
          className="outline-none"
          onMouseEnter={open}
          onMouseLeave={delayClose}
        >
          {iconUser && <BaseUser details={details} />}
          {iconOnly && <AvatarUser details={details} size="sm" />}
          {userOnly && <div className="text-sm font-semibold">{username}</div>}
        </Popover.Button>
        <Popover.Panel
          static
          className="w-screen outline-none sm:max-w-sm"
          onMouseEnter={open}
          onMouseLeave={delayClose}
        >
          <div className="overflow-hidden rounded-2xl border border-skin-border bg-skin-header-bg shadow-lg">
            <div className="max-h-[85vh] overflow-y-auto overscroll-contain">
              <div className="p-4">
                <div className="flex">
                  <div>
                    <AvatarUser details={details} size="xl" />
                  </div>
                  <div>
                    <div className="truncate px-3 text-lg font-semibold leading-10 text-skin-heading">
                      {username}
                    </div>
                    <div className="flex px-3 min-w-0 cursor-pointer items-center rounded-full text-sm text-skin-text">
                      <div
                        className="flex cursor-pointer items-center rounded border border-skin-border px-1 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(details?.metadata.address);
                        }}
                      >
                        {shorten(details?.metadata.address)}
                        <ClipboardDocumentIcon className="ml-1 w-[1em] h-[1em]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex w-full">
                  <div className="w-1/2 pr-2">
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        push(`/profile/${details?.did}`)
                      }}
                      size="sm"
                      primary
                      className="w-full"
                    >
                      View Profile
                    </Button>
                  </div>
                  <div className="w-1/2 pl-2">
                    <ButtonFollow
                      creator={details?.did}
                      className="!min-w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Float>
    </Popover>
  );
};
