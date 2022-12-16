import { Comment } from '@/helpers/interfaces';
import { useOrbis } from '@/orbis/useOrbis';
import { useAppStore } from '@/store/useAppStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './UI/Button';
import { Form } from './UI/Form';
import { Textarea } from './UI/Textarea';

interface CommentInput {
  content: string
}

export const AddComment = ({ comment }: { comment: Comment }) => {
  const form = useForm<CommentInput>({
    defaultValues: {
      content: ''
    }
  });

  const orbis = useOrbis();
  const queryClient = useQueryClient();
  const user = useAppStore((state) => state.user);
  const id = useId();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: CommentInput) => await orbis.createPost({
      body: data.content,
      reply_to: comment.stream_id,
      master: comment.stream_id,
      context: process.env.PROJECT_CONTEXT
    }),
    onMutate: async (data) => {
      await queryClient.cancelQueries(['comments', comment.stream_id]);
      const snapshotOfPreviousComments = queryClient.getQueryData([
        'comments',
        comment.stream_id
      ]);
      queryClient.setQueryData(['comments', comment.stream_id], (old: any) => {
        const optimisticData = {
          ...old,
          data: [
            {
              creator: user?.did,
              creator_details: {
                did: user?.did,
                profile: user?.details?.profile,
                metadata: user?.metadata
              },
              temporary_id: id,
              stream_id: 'none',
              content: {
                body: data.content,
                reply_to: comment.stream_id,
                master: comment.stream_id,
                context: process.env.PROJECT_CONTEXT
              },
              master: comment.stream_id,
              timestamp: Math.floor(Date.now() / 1000)
            },
            ...old.data
          ]
        };

        return optimisticData;
      });
      return { snapshotOfPreviousComments };
    },
    onError: (_err, _data, context) => {
      queryClient.setQueryData(
        ['comments', comment.stream_id],
        context?.snapshotOfPreviousComments
      );
    },
    onSuccess: () => {
      form.reset({
        content: ''
      });
    }
  });

  return (
    <div className="mb-5 px-4 md:px-0">
      <Form form={form} onSubmit={(data) => mutate(data)}>
        <Textarea
          label="Comment"
          placeholder="Add to the discussion"
          className="s-input !rounded-3xl"
          rows={4}
          {...form.register('content')}
        />
        <Button
          loading={isLoading}
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
