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
  size?: string
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
    <span
      className={clsx('flex shrink-0 items-center justify-center', className)}
    >
      <div className="relative">
        <Image
          className={clsx(
            'rounded-full bg-skin-border',
            `w-[${size}px] h-[${size}px]`
          )}
          src={src}
          alt="avatar"
          width={Number(size)}
          height={Number(size)}
          onError={() => setSrc(makeBlockie(address || ''))}
        />
      </div>
    </span>
  );
};
