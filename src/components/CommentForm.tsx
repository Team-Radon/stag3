import { Comment } from '@/helpers/interfaces';
import { ReactNode, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
  handleSubmit,
  handleCancel
}: {
  label: string | ReactNode
  initialValue?: string
  parent: Comment
  handleSubmit: (body: string, master: string, replyTo?: string) => void
  handleCancel?: () => void
}) => {
  const form = useForm<CommentInput>({
    defaultValues: {
      body: initialValue
    }
  });

  useEffect(() => {
    form.setFocus('body')
  }, [form])

  const onSubmit: SubmitHandler<CommentInput> = async (data) => {
    handleSubmit(data.body, parent.stream_id);
    form.reset({ body: '' })
  };

  return (
    <div className="mb-5 px-4 md:px-0">
      <Form form={form} onSubmit={onSubmit}>
        <Textarea
          label={label}
          placeholder="Add to the discussion"
          className="s-input !rounded-3xl"
          rows={4}
          {...form.register('body')}
        />
        <Button
          primary
          type="submit"
          disabled={!form.formState.isDirty}
        >
          Submit
        </Button>
        {handleCancel && (
          <Button onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </Form>
    </div>
  );
};
