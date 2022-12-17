import clsx from 'clsx';
import { ComponentProps, forwardRef, ReactNode, useId } from 'react';

import { FieldError } from './Form';

interface Props extends ComponentProps<'textarea'> {
  label?: string | ReactNode
  className?: string
  error?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label = 14000, className, error, ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full">
        <div className="flex justify-between">
          <label
            className="mb-[2px] flex items-center gap-1 text-skin-text"
            htmlFor={id}
          >
            {label && <div>{label}</div>}
          </label>
        </div>
        <textarea
          id={id}
          className={clsx(
            '!mt-1 h-auto w-full rounded-3xl border border-skin-border py-3 px-4 focus-within:!border-skin-text hover:border-skin-text',
            className
          )}
          ref={ref}
          {...props}
        />
        {props.name && <FieldError name={props.name} />}
      </div>
    );
  }
);
