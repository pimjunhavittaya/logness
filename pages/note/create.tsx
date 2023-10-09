import Sidebar from '../../views/DashboardPage/Sidebar';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useCreateNote } from '../../hooks/api/useCreateNote';
import { Elements } from '../../types/note';

export default function NoteCreatePage() {
  const router = useRouter();
  const workspace = router.query.workspace as string;

  const { mutate: createNote, isLoading } = useCreateNote({
    onSuccess: () => {
      void router.push(`/workspace/${workspace}`);
    },
  });

  const [title, setTitle] = useState<string>('');
  const [elements, setElements] = useState<Array<string>>([]);

  const handleCreateNote = () => {
    void createNote({
      name: title,
      workspace: workspace,
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
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <form onSubmit={handleCreateNote}>
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
      </Box>
    </Box>
  );
}
