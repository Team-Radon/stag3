import { ReactNode, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Comment } from '@/helpers/interfaces';
import { Button } from './UI/Button';
import { Form } from './UI/Form';
import { Textarea } from './UI/Textarea';

interface CommentInput {
  body: string
}

export const CommentForm = ({
  label,
  initialValue = '',
  parent,
  focus = true,
  handleSubmit,
  handleCancel
}: {
  label: string | ReactNode
  initialValue?: string
  parent: Comment
  focus?: boolean
  handleSubmit: (body: string, master: string, replyTo?: string) => void
  handleCancel?: () => void
}) => {
  const form = useForm<CommentInput>({
    defaultValues: {
      body: initialValue
    }
  });

  useEffect(() => {
    if (focus) {
      form.setFocus('body')
    }
  }, [form, focus])

  const onSubmit: SubmitHandler<CommentInput> = async (data) => {
    handleSubmit(data.body, parent.stream_id);
    form.reset({ body: '' })
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Textarea
        label={label}
        className="!rounded-md text-sm shadow-sm focus:!border-indigo-500
        focus:!ring-indigo-500"
        placeholder="Add to the discussion"
        rows={4}
        {...form.register('body')}
      />
      <div className="flex gap-2 mt-2 items-center justify-end">
        <Button
          className="cursor-pointer disabled:opacity-70"
          primary
          type="submit"
          disabled={!form.formState.isDirty}
        >
          Post
        </Button>
        {handleCancel && (
        <Button className="cursor-pointer" onClick={handleCancel}>
          Cancel
        </Button>
        )}
      </div>
    </Form>
  );
};
