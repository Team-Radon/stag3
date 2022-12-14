import { ReactNode } from 'react';

interface Props {
  children: ReactNode
  className?: string
}

export const GridLayout = ({ children, className = '' }: Props) => (
  <div
    className={`container mx-auto px-4 flex-1 md:px-6 2xl:px-12 ${className}`}
  >
    <div className="grid grid-cols-12 gap-4 lg:gap-12">{children}</div>
  </div>
);

export const GridItemFour = ({ children, className = '' }: Props) => (
  <div className={`col-span-12 lg:col-span-4 ${className}`}>{children}</div>
);

export const GridItemSix = ({ children, className = '' }: Props) => (
  <div className={`col-span-12 lg:col-span-6 ${className}`}>{children}</div>
);

export const GridItemEight = ({ children, className = '' }: Props) => (
  <div className={`col-span-12 lg:col-span-8 ${className}`}>{children}</div>
);

export const GridItemTwelve = ({ children, className = '' }: Props) => (
  <div className={`col-span-12 ${className}`}>{children}</div>
);
