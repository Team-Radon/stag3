import clsx from 'clsx';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  ReactNode
} from 'react';

interface Props
  extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
  > {
  children?: ReactNode
  className?: string
}

export const ButtonRounded = forwardRef<HTMLButtonElement, Props>(
  ({ className = '', children, ...rest }, ref) => (
    <button
      ref={ref}
      className={clsx(
        'flex h-[44px] w-[44px] cursor-pointer select-none items-center justify-center rounded-full border border-skin-border hover:border-accent',
        className
      )}
      {...rest}
    >
      <div>{children}</div>
    </button>
  )
);
