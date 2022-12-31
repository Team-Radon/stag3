import { useMutation, MutationFunction, UseMutationOptions } from '@tanstack/react-query';
import { useOrbis } from '../useOrbis';

interface AddCommentVariables {
  body: string
  master: string
  replyTo?: string
  context: string
}

export function useAddCommentMutation<
  TData = { addComment: {
    status: number
    doc: string
    result: string
  } },
  TError = unknown,
  TVariables = AddCommentVariables,
  TContext = unknown
> (options?: UseMutationOptions<TData, TError, TVariables, TContext>) {
  const orbis = useOrbis();

  const addComment: MutationFunction<TData, TVariables> = async (variables: any) => {
    const result = await orbis.createPost({
      body: variables.body,
      reply_to: variables.replyTo,
      master: variables.master,
      context: variables.context
    })

    return result;
  }

  return useMutation(addComment, options)
}
