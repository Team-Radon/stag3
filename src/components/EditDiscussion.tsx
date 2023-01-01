/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-mixed-operators */
import { Discussion } from '@/helpers/interfaces';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
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

export const EditDiscussion = ({ discussion }: { discussion: Discussion }) => {
  const orbis = useOrbis();
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const form = useForm<DiscussionInput>({
    defaultValues: {
      body: '',
      title: ''
    }
  });

  const onSubmit: SubmitHandler<DiscussionInput> = async (project) => {
    setLoading(true);
    const res = await orbis.editPost(discussion.stream_id, {
      title: project.title,
      body: project.body
    });

    if (res.status === 300) {
      toast.error(JSON.stringify(res));
    }

    if (res.status === 200) {
      queryClient.invalidateQueries({ queryKey: ['discussions', null] });
      queryClient.invalidateQueries({ queryKey: ['discussion', discussion.stream_id] });
      toast.success('Updated');
      form.reset({ body: '', title: '' })
    }

    setLoading(false);
  }

  useEffect(() => {
    form.reset({
      title: discussion.content.title,
      body: discussion.content.body
    })
  }, [discussion, form])

  const body = form.watch('body')

  return (
    <Card padded>
      <Form form={form} onSubmit={onSubmit}>
        <div className="space-y-8">
          <div className="details">
            <div className="inputs flex flex-col gap-4 my-6">
              <Input label="Topic" {...form.register('title', { required: true })} placeholder="specific title" />
              <MarkdownEditor
                label="Content"
                placeholder="Tell me more about the topic"
                {...form.register('body', { required: true })}
                imageUploaded={(injectedBody) => form.setValue('body', injectedBody)}
                count={body.length}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            primary
            loading={loading}
            type="submit"
            disabled={!form.formState.isDirty}
            className="disabled:opacity-70"
          >
            Update
          </Button>
        </div>
      </Form>
    </Card>
  );
}
