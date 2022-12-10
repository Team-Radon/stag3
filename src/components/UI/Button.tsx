/* eslint-disable react/button-has-type */
/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
import clsx from 'clsx';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  ReactNode
} from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface Props
  extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
  > {
  primary?: boolean
  loading?: boolean
  children?: ReactNode
  icon?: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, Props>((
  { className = '', primary = false, loading, children, icon, size = 'md', ...rest },
  ref
) => (
  <button
    ref={ref}
    className={clsx(
      'flex items-center rounded-full border bg-white border-skin-border font-medium text-skin-text hover:text-accent hover:border-accent',
      { 'px-2 py-1 text-sm space-x-2': size === 'sm' },
      { 'px-3 py-2 text-sm space-x-2': size === 'md' },
      { 'px-8 py-3 text-base space-x-3': size === 'lg' },
      {
        '!text-white !bg-accent border border-accent':
          primary
      },
      className
    )}
    disabled={rest.disabled || loading}
    {...rest}
  >
    {loading ? <LoadingSpinner className={size} /> : icon}
    <div>{children}</div>
  </button>
));
