import clsx from 'clsx';
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  className?: string
  padded?: boolean
}

const Card = ({ children, className = '', padded = false }: Props) => (
  <div className={clsx(
    'bg-white shadow rounded-lg md:rounded-xl overflow-hidden',
    { 'px-4 py-6 sm:px-6': padded },
    className
  )}
  >
    {children}
  </div>
);

export default Card;
