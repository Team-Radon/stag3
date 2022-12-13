import { useForkRef } from '@/hooks/useForkRef';
import { useImageUpload } from '@/hooks/useImageUpload';
import { PencilIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, forwardRef, useRef } from 'react';
import { ProjectLogo } from './ProjectLogo';
import { ProjectLogoOverlay } from './ProjectLogoOverlay';

interface Props {
  logo: string | undefined
  imageUploaded?: (url: string) => void
}

export const InputUploadLogo = forwardRef<HTMLInputElement, Props>(
  ({ logo, imageUploaded }, ref) => {
    const { upload, isUploadingImage } = useImageUpload();

    const previewFile = useRef<File | undefined>(undefined);
    const uploadSuccess = useRef<boolean>(false);

    function onFileChange (e: ChangeEvent<HTMLInputElement>) {
      uploadSuccess.current = false;
      if (e.target.files?.[0]) previewFile.current = e.target.files?.[0];
      if (typeof previewFile.current !== 'undefined') {
        upload(previewFile.current, (image) => {
          uploadSuccess.current = true;
          if (imageUploaded) {
            imageUploaded(image.url);
          }
        });
      }
    }

    const rootRef = useRef(ref);
    const handleRef = useForkRef(rootRef, ref);

    const onFilePicker = () => {
      const rootNode = rootRef.current as unknown as HTMLDivElement;

      rootNode.getElementsByTagName('input')[0].click();
    };

    return (
      <>
        <div className="relative" onClick={onFilePicker} ref={handleRef}>
          <ProjectLogo
            logo={logo}
            previewFile={
              uploadSuccess.current ? previewFile.current : undefined
            }
          />
          <ProjectLogoOverlay
            loading={isUploadingImage}
            logo={logo}
          />
          <div className="absolute right-0 bottom-[2px] rounded-full bg-skin-heading p-2">
            <PencilIcon className="w-[14px] h-[14px] text-skin-bg" />
          </div>
          <input
            ref={ref}
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            className="hidden"
            onChange={onFileChange}
          />
        </div>
      </>
    );
  }
);
