import { useMutation, MutationFunction, UseMutationOptions } from '@tanstack/react-query';
import { useOrbis } from '../useOrbis';

interface UpdateCommentVariables {
  id: string
  body: string
  master: string
}

export function useUpdateCommentMutation<
  TData = { updateComment: {
    status: number
    doc: string
    result: string
  } },
  TError = unknown,
  TVariables = UpdateCommentVariables,
  TContext = unknown
> (options?: UseMutationOptions<TData, TError, TVariables, TContext>) {
  const orbis = useOrbis();

  const updateComment: MutationFunction<TData, TVariables> = async (variables: any) => {
    const result = await orbis.editPost(variables.id, {
      body: variables.body,
      master: variables.master
    })

    return result;
  }

  return useMutation(updateComment, options)
}
