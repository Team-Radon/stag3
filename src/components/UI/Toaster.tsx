import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import toast, { Toaster as FlashNotification } from 'react-hot-toast';
import { Button } from './Button';

export const Toaster = () => (
  <FlashNotification position="top-right">
    {(t) => (
      <Button
        className={clsx(
          'flex items-center space-x-2 !border-none !bg-red !text-white',
          { '!bg-green': t.type === 'success' }
        )}
        onClick={() => toast.dismiss(t.id)}
      >
        {t.type === 'success' && <CheckIcon className="w-[16px] h-[16px]" />}
        {t.type === 'error' && <XMarkIcon className="w-[16px] h-[16px]" />}
        <span>{t.message as string}</span>
      </Button>
    )}
  </FlashNotification>
);
