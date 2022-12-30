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
        className="block text-sm font-medium text-gray-700"
        htmlFor={id}
      >
        {label && <>{label}</>}
      </label>
      <div className="group relative mt-2">
        <input
          id={id}
          className={clsx(
            'block w-full rounded-md bg-transparent border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
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
