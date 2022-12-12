import clsx from 'clsx';
import { ComponentProps, forwardRef, ReactNode, useId } from 'react';
import { FieldError } from './Form';

interface Props extends Omit<ComponentProps<'input'>, 'prefix'> {
  label?: string
  prefix?: string | ReactNode
  iconLeft?: ReactNode
  iconRight?: ReactNode
  className?: string
  helper?: ReactNode
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, Props>((
  {
    label,
    prefix,
    type = 'text',
    iconLeft,
    iconRight,
    error,
    className = '',
    helper,
    ...props
  },
  ref
) => {
  const id = useId();

  return (
    <div className="w-full">
      <label
        className="mb-[2px] flex items-center gap-1 text-skin-text"
        htmlFor={id}
      >
        {label && <div>{label}</div>}
      </label>
      <div className="group relative z-10">
        <input
          id={id}
          className={clsx(
            's-input !h-[42px]',
            { '!border-red': error },
            { 'cursor-not-allowed placeholder:!opacity-30': props.disabled },
            className
          )}
          type={type}
          ref={ref}
          {...props}
        />
      </div>
      {props.name && <FieldError name={props.name} />}
    </div>
  );
});
