import Sidebar from '../../views/DashboardPage/Sidebar';
import { Alert, Box, Button, CircularProgress, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useGetNote } from '../../hooks/api/useGetNote';
import NoteEditor from '../../views/NotePage/NoteEditor';
import { useArchiveNote } from '../../hooks/api/useArchiveNote';
import { useMixpanel } from '../../contexts/mixpanel.context';
import { daysPassedSinceTimestamp } from '../../utils/daysPassedSinceTimestamp';

export default function NotePage() {
  const router = useRouter();
  const noteId = router.query.id as string;

  const { refetch, data, isLoading, isError } = useGetNote(noteId);

  const mixpanel = useMixpanel();

  const { mutate: archive, isLoading: isArchiving } = useArchiveNote({
    onSuccess: () => {
      if (data) {
        mixpanel.track('note_archived', {
          'note_lifetime_days': daysPassedSinceTimestamp(data.createdAt),
          'note_days_since_last_edit': data.editedAt ? daysPassedSinceTimestamp(data.editedAt) : NaN,
          'note_elements': data.content,
        });
      }

      void router.push('/dashboard');
    },
  });
  const handleArchive = () => {
    void archive({ id: noteId });
  };

  useEffect(() => {
    void refetch();
  }, [noteId]);

  if (isError) {
    return <Alert severity='error'>Note not found</Alert>;
  }

  if (isLoading || isArchiving) {
    return <CircularProgress />;
  }

  if (!data) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Stack spacing={2}>
          <NoteEditor note={data} />
          <Box>
            <Button onClick={handleArchive} variant='contained' color='error'>
              archive note
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
