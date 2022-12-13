import toast from 'react-hot-toast';
import { useRef, useState } from 'react';
import { useOrbis } from '@/orbis/useOrbis';
import { getUploadedMediaUrl } from '@/helpers/utils';
import { ALLOWED_IMAGE_TYPES } from '@/constants';

export function useImageUpload () {
  const orbis = useOrbis();
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  const imageUploadError = useRef<string>('');
  const imageUrl = useRef<string>('');

  const reset = () => {
    setIsUploadingImage(false);
    imageUploadError.current = '';
    imageUrl.current = '';
  };

  const upload = async (
    file: File,
    onSuccess?: (image: { name: string, url: string }) => void
  ) => {
    reset();

    if (!file) return;

    setIsUploadingImage(true);

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      imageUploadError.current = 'Unsupported file type';
      setIsUploadingImage(false);
      return;
    }

    try {
      const res = await orbis.uploadMedia(file);
      imageUrl.current = getUploadedMediaUrl(res.result);
      if (onSuccess) {
        onSuccess({ name: file.name, url: imageUrl.current });
      }
    } catch (err) {
      toast.error('Something went wrong!');
      imageUploadError.current = (err as Error).message;
    } finally {
      setIsUploadingImage(false);
    }
  };

  return {
    isUploadingImage,
    imageUploadError: imageUploadError.current,
    image: {
      url: imageUrl
    },
    upload
  };
}
