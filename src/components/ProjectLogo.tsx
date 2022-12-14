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
  console.log(logo, LOGO_PLACEHOLDER, 'LKAJSDF')

  useEffect(() => {
    if (previewFile) {
      setSrc(URL.createObjectURL(previewFile));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewFile]);

  return (
    <div className={clsx('shrink-0 aspect-square rounded-md md:rounded-lg overflow-hidden', className)}>
      <Image
        className="w-full h-full"
        src={src}
        alt="logo"
        width={Number(size)}
        height={Number(size)}
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
    </div>
  );
};
