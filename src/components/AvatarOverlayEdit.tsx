import clsx from 'clsx';
import { LoadingSpinner } from './UI/LoadingSpinner';

export const AvatarOverlayEdit = ({
  loading,
  avatar
}: {
  loading: boolean
  avatar?: string
}) => (
  <div
    className={clsx(
      'group absolute right-0 left-0 top-0 bottom-0 flex cursor-pointer items-center justify-center rounded-full transition-colors ease-out hover:bg-skin-border hover:opacity-80',
      {
        'bg-skin-border opacity-80': loading
      }
    )}
  >
    {loading && (
    <>
      <div className="hidden transition-all ease-out group-hover:block">
        {avatar ? 'edit' : 'upload'}
      </div>

      <LoadingSpinner />
    </>
    )}
  </div>
);
