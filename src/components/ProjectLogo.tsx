import { LOGO_PLACEHOLDER } from '@/constants';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const ProjectLogo = ({
  logo,
  size = '200',
  className = '',
  previewFile = undefined
}: {
  logo?: string
  size?: string
  className?: string
  previewFile?: File | undefined
}) => {
  const [src, setSrc] = useState<string>(logo || LOGO_PLACEHOLDER);

  useEffect(() => {
    if (previewFile) {
      setSrc(URL.createObjectURL(previewFile));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewFile]);

  return (
    <span
      className={clsx('flex shrink-0 items-center justify-center', className)}
    >
      <div className="relative">
        <Image
          className={clsx(
            'bg-skin-border',
          `w-[${size}px] h-[${size}px]`
          )}
          src={src}
          alt="logo"
          width={Number(size)}
          height={Number(size)}
        />
      </div>
    </span>
  );
};
