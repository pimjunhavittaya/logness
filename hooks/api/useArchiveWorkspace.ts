import { useMutation, UseMutationOptions } from 'react-query';
import { useAuthContext } from '../../contexts/auth.context';

export type ArchiveWorkspaceParams = {
  id: string;
}

export const useArchiveWorkspace = (options?: UseMutationOptions<boolean, unknown, ArchiveWorkspaceParams>) => {
  const { user } = useAuthContext();

  return useMutation<boolean, Error, ArchiveWorkspaceParams>(
    async ({ id }: ArchiveWorkspaceParams): Promise<boolean> => {
      if (!user) {
        throw new Error('Login to archive workspace');
      }

      const response = await fetch('/api/workspace/archive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const jsonRes = await response.json();

      if (!response.ok) {
        throw new Error(jsonRes);
      }

      return true;
    },
    options,
  );

};
