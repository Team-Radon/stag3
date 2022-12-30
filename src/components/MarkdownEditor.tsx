import { useForkRef } from '@/hooks/useForkRef';
import { useImageUpload } from '@/hooks/useImageUpload';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import {
  ComponentProps,
  DragEvent,
  forwardRef,
  useId,
  useRef,
  ClipboardEvent
} from 'react';
import { FieldError } from './UI/Form';
import { LoadingSpinner } from './UI/LoadingSpinner';

interface Props extends ComponentProps<'textarea'> {
  limit?: number
  label?: string
  className?: string
  error?: boolean
  count?: number
  imageUploaded: (currentBodyWithImage: string) => void
}

export const MarkdownEditor = forwardRef<HTMLTextAreaElement, Props>(
  (
    { label, limit = 14000, className, error, count, imageUploaded, ...props },
    ref
  ) => {
    const id = useId();
    const { upload, imageUploadError, isUploadingImage } = useImageUpload();

    const rootRef = useRef(ref);
    const handleRef = useForkRef(rootRef, ref);

    const injectImageToBody = (image: { name: string, url: string }) => {
      const textAreaRef = rootRef.current as unknown as HTMLTextAreaElement;

      const cursorPosition = textAreaRef.selectionStart;
      const currentBody = textAreaRef.value;
      const currentBodyWithImage = `${currentBody?.substring(
        0,
        cursorPosition
      )} \n![${image.name}](${image.url})
        ${currentBody?.substring(cursorPosition)}`;

      imageUploaded(currentBodyWithImage);
    };

    const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
      for (const item of e.clipboardData.items) {
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          const file = item.getAsFile();

          // Check if the file variable is not null
          if (file !== null) {
            upload(
              new File([file], 'image', { type: file.type }),
              injectImageToBody
            );
          }
        }
      }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      for (const item of e.dataTransfer.files) {
        if (item.type.startsWith('image/')) {
          upload(item, injectImageToBody);
        }
      }
    };

    return (
      <div onDrop={handleDrop}>
        <div className="w-full">
          <div className="flex justify-between">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor={id}
            >
              {label && <div>{label}</div>}
            </label>
            <div className="text-xs">
              {count}
              {' '}
              /
              {' '}
              {limit}
            </div>
          </div>
          <div className="min-h-[240px] mt-2 -mb-[6px] rounded-t-md focus-within:border-accent">
            <textarea
              id={id}
              className={clsx(
                's-input mt-0 h-full min-h-[240px] w-full !rounded-t-md border border-skin-border  border-b-0 pt-2 text-sm',
                { '!border-red': error },
                {
                  'cursor-not-allowed placeholder:!opacity-30': props.disabled
                },
                className
              )}
              {...props}
              ref={handleRef}
              maxLength={limit}
              onPaste={handlePaste}
            />
          </div>
          <div className="relative bg-skin-border flex items-center justify-between rounded-b-md border border-skin-border py-1 px-2">
            <span className="pointer-events-none relative pl-1 text-sm">
              {isUploadingImage
                ? (
                  <span className="flex items-center space-x-2">
                    <LoadingSpinner />
                    <span>Uploading image</span>
                  </span>
                  )
                : imageUploadError !== ''
                  ? (
                    <span>{imageUploadError}</span>
                    )
                  : (
                    <span>Attach images by dragging & dropping, selecting or pasting them.</span>
                    )}
            </span>

            <a
              className="relative inline"
              rel="noreferrer"
              target="_blank"
              href="https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
            >
              <QuestionMarkCircleIcon className="w-[1em] h-[1em]" />
            </a>
          </div>
          {props.name && <FieldError name={props.name} />}
        </div>
      </div>
    );
  }
);
