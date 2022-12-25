import { zodResolver } from '@hookform/resolvers/zod';
import { ComponentProps } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
  UseFormProps,
  UseFormReturn
} from 'react-hook-form';
import { TypeOf, ZodSchema } from 'zod';

interface UseZodFormProps<T extends ZodSchema<FieldValues>>
  extends UseFormProps<TypeOf<T>> {
  schema: T
}

export const useZodForm = <T extends ZodSchema<FieldValues>>({
  schema,
  ...formConfig
}: UseZodFormProps<T>) => useForm({
    ...formConfig,
    resolver: zodResolver(schema)
  });

interface FieldErrorProps {
  name?: string
}

export const FieldError = ({ name }: FieldErrorProps) => {
  const {
    formState: { errors }
  } = useFormContext();

  if (!name) {
    return null;
  }

  const error = errors[name];

  if (!error) {
    return null;
  }

  return <div className="s-error">{error.message as any}</div>;
};

interface Props<T extends FieldValues = Record<string, unknown>>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
  className?: string
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  className = ''
}: Props<T>) => (
  <FormProvider {...form}>
    <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset
        className={`${className}`}
        disabled={form.formState.isSubmitting}
      >
        {children}
      </fieldset>
    </form>
  </FormProvider>
  );
