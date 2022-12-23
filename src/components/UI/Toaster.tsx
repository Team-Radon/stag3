import { XMarkIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useToaster, toast } from 'react-hot-toast';

export const Toaster = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;

  return (
    <div onMouseEnter={startPause} onMouseLeave={endPause} className="fixed top-20 right-4 z-50">
      {
        toasts.filter((t) => t.visible).map((t) => (
          <div
            key={t.id}
            className={clsx('min-w-[350px] flex items-center space-x-4 p-4 mb-4 bg-gray-100 dark:bg-[#291f43] border-l-8 shadow-md', {
              'border-red-400 dark:border-red-500': t.type === 'error',
              'border-green-400 dark:border-green-500': t.type === 'success'
            })}
          >
            <>
              {t.type === 'error' && <XCircleIcon className="shrink-0 w-6 h-6 text-red-400 dark:text-red-500" />}
              {t.type === 'success' && <CheckCircleIcon className="shrink-0 w-6 h-6 text-green-400 dark:text-green-500" />}

              {t.message}
            </>
            <div className="shrink grow" />
            <button onClick={() => toast.dismiss(t.id)}>
              <XMarkIcon className="shrink-0 w-4 h-4 text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-400 hover:dark:text-slate-300" />
            </button>
          </div>
        ))
      }
    </div>
  );
};
