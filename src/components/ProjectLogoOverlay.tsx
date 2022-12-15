import clsx from 'clsx';
import { LoadingSpinner } from './UI/LoadingSpinner';

export const ProjectLogoOverlay = ({
  loading,
  logo
}: {
  loading: boolean
  logo?: string
}) => (
  <div
    className={clsx(
      'group absolute rounded-md md:rounded-lg right-0 left-0 top-0 bottom-0 flex cursor-pointer items-center justify-center transition-colors ease-out hover:bg-skin-border hover:opacity-80',
      {
        'bg-skin-border opacity-80': loading
      }
    )}
  >
    {loading
      ? (
        <div>
          <LoadingSpinner />
        </div>
        )
      : (
        <div className="hidden transition-all font-semibold ease-out group-hover:block">
          {logo ? 'Edit' : 'Upload'}
        </div>
        )}
  </div>
);
