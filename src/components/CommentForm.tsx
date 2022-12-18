import { Comment } from '@/helpers/interfaces';
import { ReactNode } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from './UI/Button';
import { Form } from './UI/Form';
import { Textarea } from './UI/Textarea';

interface CommentInput {
  body: string
}

export const CommentForm = ({ label, parent, handleSubmit }: { label: string | ReactNode, parent: Comment, handleSubmit: (body: string, master: string, replyTo?: string) => void }) => {
  const form = useForm<CommentInput>({
    defaultValues: {
      body: ''
    }
  });

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
      </Form>
    </div>
  );
};