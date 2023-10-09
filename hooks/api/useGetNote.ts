import { useQuery } from 'react-query';
import { Note } from '../../types/note';

export const useGetNote = (id: string) => {
  return useQuery(['note', id], async (): Promise<Note> => {
    const response = await fetch(`/api/note/get?id=${id}`)
    const jsonRes = await response.json();

    if (!response.ok) {
      throw new Error(jsonRes);
    } else {
      return jsonRes as Note;
    }
  })
}
