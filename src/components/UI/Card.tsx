import clsx from 'clsx';
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  className?: string
}

const Card = ({ children, className = '' }: Props) => (
  <div className={clsx('px-4 py-6 sm:px-6 shadow bg-white rounded-lg md:rounded-xl', className)}>
    <div>{children}</div>
  </div>
);

export default Card;
