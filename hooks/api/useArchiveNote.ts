import { useMutation, UseMutationOptions } from 'react-query';
import { useAuthContext } from '../../contexts/auth.context';

export type ArchiveNoteParams = {
  id: string;
}

export const useArchiveNote = (options?: UseMutationOptions<boolean, unknown, ArchiveNoteParams>) => {
  const { user } = useAuthContext();

  return useMutation<boolean, Error, ArchiveNoteParams>(
    async ({ id }: ArchiveNoteParams): Promise<boolean> => {
      if (!user) {
        throw new Error('Login to archive note');
      }

      const response = await fetch('/api/note/archive', {
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
