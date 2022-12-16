import Image from 'next/image';
import { useEffect, useState } from 'react';

export const ProjectCover = ({
  cover,
  size = '200',
  className = '',
  previewFile = undefined
}: {
  cover?: string
  size?: string
  className?: string
  previewFile?: File | undefined
}) => {
  const [src, setSrc] = useState<string | undefined>(cover);

  useEffect(() => {
    if (previewFile) {
      setSrc(URL.createObjectURL(previewFile));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewFile]);

  return (
    <div className="absolute right-0 left-0 top-0 bottom-0">
      {src && (
      <Image
        className="w-full h-full rounded-md"
        src={src}
        alt="cover"
        width={Number(size)}
        height={Number(size)}
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      )}
    </div>
  );
};
