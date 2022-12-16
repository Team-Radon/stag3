import { useImageUpload } from '@/hooks/useImageUpload';
import clsx from 'clsx';
import { forwardRef, useRef } from 'react';
import Dropzone from 'react-dropzone';
import { ProjectCover } from './ProjectCover';
import { ProjectCoverOverlay } from './ProjectCoverOverlay';

interface Props {
  cover: string | undefined
  imageUploaded?: (url: string) => void
}

export const InputUploadCover = forwardRef<HTMLInputElement, Props>(
  ({ cover, imageUploaded }, ref) => {
    const { upload, isUploadingImage } = useImageUpload();

    const previewFile = useRef<File | undefined>(undefined);
    const uploadSuccess = useRef<boolean>(false);

    const handleDrop = (acceptedFiles: File[]) => {
      uploadSuccess.current = false;
      if (acceptedFiles?.[0]) previewFile.current = acceptedFiles?.[0];
      if (typeof previewFile.current !== 'undefined') {
        upload(previewFile.current, (image) => {
          uploadSuccess.current = true;
          if (imageUploaded) {
            imageUploaded(image.url);
          }
        });
      }
    }

    return (
      <Dropzone
        onDrop={handleDrop}
        maxFiles={1}
        accept={{
          'image/*': ['.png', '.jpeg', '.jpg']
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div className="cover">
            <span className="block text-sm font-medium text-gray-700">
              Cover Image
            </span>
            <div {...getRootProps()} className={clsx('relative mt-2 flex items-center justify-center aspect-[4/1] rounded-md  p-4', { 'border-2 border-dashed border-gray-300': typeof previewFile.current === 'undefined' })}>
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      {...getInputProps()}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
              </div>

              <ProjectCover
                cover={cover}
                previewFile={uploadSuccess.current ? previewFile.current : undefined}
              />
              <ProjectCoverOverlay
                loading={isUploadingImage}
                cover={cover}
              />
            </div>
          </div>
        )}
      </Dropzone>
    );
  }
);
