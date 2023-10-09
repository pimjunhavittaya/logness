import { Elements, Note } from 'types/note';
import { Box, Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useEditNote } from '../../hooks/api/useEditNote';
import { useRouter } from 'next/router';
import { useMixpanel } from '../../contexts/mixpanel.context';

export type NoteEditorProps = {
  note: Note;
}

export default function NoteEditor({ note }: NoteEditorProps) {
  const mixpanel = useMixpanel();

  const [title, setTitle] = useState<string>(note.name);
  const [elements, setElements] = useState<Array<string>>(note.content);

  const { mutate, isLoading } = useEditNote({
    onSuccess: (data) => {
      mixpanel.track('note_edited', {
        'workspace_type': 'private',
        'note_elements': data.content,
      });
    },
  });

  const handleEditNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void mutate({
      id: note.id,
      name: title,
      content: elements,
    });
  };

  const handleAddElement = (element: string) => {
    setElements((prev) => ([
      ...prev,
      element,
    ]));
  };

  return (
    <form onSubmit={handleEditNote}>
      <Stack spacing={2} width={500}>
        <TextField
          value={title}
          placeholder='Note Title'
          required
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
        />
        <Stack direction='row' spacing={1}>
          {
            Elements.map((element) => (
              <Button key={element} variant='outlined' onClick={() => {
                handleAddElement(element);
              }}>{element}</Button>
            ))
          }
        </Stack>
        <Stack sx={{ border: '1px solid lightGrey', minHeight: 100 }} spacing={1}>
          {elements.map((elem, idx) => (
            <Box key={idx}>{elem}</Box>
          ))}
        </Stack>
        <Box>
          <Button variant='contained' disabled={isLoading} type='submit'>Save</Button>
        </Box>
      </Stack>
    </form>
  );
}
