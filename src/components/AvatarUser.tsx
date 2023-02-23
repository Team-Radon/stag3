/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useAddress } from '@/hooks/useAddress';
import clsx from 'clsx';
import makeBlockie from 'ethereum-blockies-base64';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Details } from '../helpers/interfaces';

export const AvatarUser = ({
  details,
  size,
  className = '',
  previewFile = undefined
}: {
  details?: Details
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  previewFile?: File | undefined
}) => {
  const { address } = useAddress(details)

  const [src, setSrc] = useState<string>(
    details?.profile?.pfp ??
      makeBlockie(address ?? 'shimone')
  );

  useEffect(() => {
    if (previewFile) {
      setSrc(URL.createObjectURL(previewFile));
      return;
    }

    setSrc(
      details?.profile?.pfp ??
        makeBlockie(address ?? 'shimone')
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details, previewFile]);

  return (
    <div
      className={clsx('flex shrink-0 items-center justify-center', className)}
    >
      <div className={clsx(
        'relative rounded-full overflow-hidden',
        { 'w-6 h-6': size === 'xs' },
        { 'w-8 h-8': size === 'sm' },
        { 'w-10 h-10': size === 'md' },
        { 'w-12 h-12': size === 'lg' },
        { 'w-20 h-20': size === 'xl' }
      )}
      >
        <Image
          className="w-full h-full bg-skin-border"
          src={src}
          alt="avatar"
          width={100}
          height={100}
          onError={() => setSrc(makeBlockie(address || ''))}
        />
      </div>
    </div>
  );
};
