import clsx from 'clsx';
import { LoadingSpinner } from './UI/LoadingSpinner';

export const ProjectCoverOverlay = ({
  loading,
  cover
}: {
  loading: boolean
  cover?: string
}) => (
  <div
    className={clsx(
      'group absolute right-0 left-0 top-0 bottom-0 flex cursor-pointer items-center justify-center rounded-md transition-colors ease-out hover:bg-skin-border hover:opacity-80',
      {
        'bg-skin-border opacity-80': loading
      }
    )}
  >
    {loading && (
    <>
      <div className="hidden transition-all ease-out group-hover:block">
        {cover ? 'edit' : 'upload'}
      </div>

      <LoadingSpinner />
    </>
    )}
  </div>
);
