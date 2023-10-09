import { useMutation, UseMutationOptions } from 'react-query';
import { Workspace } from '../../types/workspace';
import { useAuthContext } from '../../contexts/auth.context';
import { Note } from 'types/note';

export type CreateNoteParams = {
  name: string;
  workspace: string;
  content: Array<string>;
}

export const useCreateNote = (options?: UseMutationOptions<Note, unknown, CreateNoteParams>) => {
  const { user } = useAuthContext();

  return useMutation<Note, Error, CreateNoteParams>(
    async ({ name, workspace, content }: CreateNoteParams): Promise<Note> => {
      if (!user) {
        throw new Error('Login to create note');
      }

      const response = await fetch('/api/note/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ owner: user.id, name, workspace, content }),
      });
      console.log('response: ', response);
      const jsonRes = await response.json();

      if (!response.ok) {
        throw new Error(jsonRes);
      } else {
        return jsonRes as Note;
      }
    }, options);
};
