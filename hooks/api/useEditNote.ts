import { useMutation, UseMutationOptions } from 'react-query';
import { Workspace } from '../../types/workspace';
import { useAuthContext } from '../../contexts/auth.context';
import { Note } from 'types/note';

export type EditNoteParams = {
  id: string;
  name: string;
  content: Array<string>;
}

export const useEditNote = (options?: UseMutationOptions<Note, unknown, EditNoteParams>) => {
  const { user } = useAuthContext();

  return useMutation<Note, Error, EditNoteParams>(
    async ({ id, name, content }: EditNoteParams): Promise<Note> => {
      if (!user) {
        throw new Error('Login to edit note');
      }

      const response = await fetch('/api/note/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name, content }),
      });
      const jsonRes = await response.json();

      if (!response.ok) {
        throw new Error(jsonRes);
      } else {
        return jsonRes as Note;
      }
    }, options);
};
