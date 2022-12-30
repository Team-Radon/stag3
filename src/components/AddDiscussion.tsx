/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-mixed-operators */
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useOrbis } from '../orbis/useOrbis';
import { MarkdownEditor } from './MarkdownEditor';
import { Button } from './UI/Button';
import Card from './UI/Card';
import { Form } from './UI/Form';
import { Input } from './UI/Input';

interface DiscussionInput {
  body: string
  title: string
}

export const AddDiscussion = () => {
  const orbis = useOrbis();

  const form = useForm<DiscussionInput>({
    defaultValues: {
      body: '',
      title: ''
    }
  });

  const onSubmit: SubmitHandler<DiscussionInput> = async (project) => {
    const res = await orbis.createPost({
      title: project.title,
      body: project.body,
      context: process.env.DISCUSSION_CONTEXT
    });

    if (res.status === 300) {
      console.log(res);
    }

    if (res.status === 200) {
      toast.success('saved');
      form.reset({ body: '', title: '' })
    }
  }

  const body = form.watch('body')

  return (
    <Card padded>
      <Form form={form} onSubmit={onSubmit}>
        <div className="space-y-8">
          <div className="details">
            <div className="inputs flex flex-col gap-4 my-6">
              <Input label="Topic" {...form.register('title',{ required: true })} placeholder="specific title" />
              <MarkdownEditor
                label="Content"
                placeholder="Tell me more about the topic"
                {...form.register('body',{ required: true })}
                imageUploaded={(injectedBody) => form.setValue('body', injectedBody)}
                count={body.length}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            primary
            type="submit"
            disabled={!form.formState.isDirty}
            className="disabled:opacity-70"
          >
            Post
          </Button>
        </div>
      </Form>
    </Card>
  );
}
