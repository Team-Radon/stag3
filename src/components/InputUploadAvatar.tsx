import { Details } from '@/helpers/interfaces';
import { useForkRef } from '@/hooks/useForkRef';
import { useImageUpload } from '@/hooks/useImageUpload';
import { PencilIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, forwardRef, useRef } from 'react';
import { AvatarOverlayEdit } from './AvatarOverlayEdit';
import { AvatarUser } from './AvatarUser';

interface Props {
  details: Details
  imageUploaded: (url: string) => void
}

export const InputUploadAvatar = forwardRef<HTMLInputElement, Props>(
  ({ details, imageUploaded }, ref) => {
    const { upload, isUploadingImage } = useImageUpload();

    const previewFile = useRef<File | undefined>(undefined);
    const uploadSuccess = useRef<boolean>(false);

    function onFileChange (e: ChangeEvent<HTMLInputElement>) {
      uploadSuccess.current = false;
      if (e.target.files?.[0]) previewFile.current = e.target.files?.[0];
      if (typeof previewFile.current !== 'undefined') {
        upload(previewFile.current, (image) => {
          uploadSuccess.current = true;
          imageUploaded(image.url);
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
          <AvatarUser
            details={details}
            size="xl"
            previewFile={
              uploadSuccess.current ? previewFile.current : undefined
            }
          />
          <AvatarOverlayEdit
            loading={isUploadingImage}
            avatar={details?.profile?.pfp}
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
