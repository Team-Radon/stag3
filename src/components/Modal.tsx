import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, ReactNode } from 'react';

interface Props {
  title?: string
  open: boolean
  hideClose?: boolean
  children: ReactNode[] | ReactNode
  onClose: () => void
}

export const Modal = ({
  open,
  title,
  hideClose = false,
  children,
  onClose
}: Props) => (
  <Transition.Root show={open} as={Fragment}>
    <Dialog
      as="div"
      className="modal z-50 mx-auto w-screen"
      onClose={onClose}
    >
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog.Overlay className="backdrop" />
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-100"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-100"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div className="shell relative overflow-hidden rounded-lg">
          <div className="flex justify-between p-4 border-b border-skin-border">
            <h3>{title}</h3>
            {!hideClose && (
            <button
              aria-label="Close"
              onClick={onClose}
            >
              <XMarkIcon className="w-6 h-6 hover:text-accent" />
            </button>
            )}
          </div>
          <div>{children}</div>
        </div>
      </Transition.Child>
    </Dialog>
  </Transition.Root>
);
