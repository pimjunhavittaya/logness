import Sidebar from '../../views/DashboardPage/Sidebar';
import { Box, Button, Skeleton, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGetWorkspaces } from '../../hooks/api/useGetWorkspaces';
import NoteList from '../../views/WorkspacePage/noteList';
import { useArchiveWorkspace } from '../../hooks/api/useArchiveWorkspace';
import { useMixpanel } from '../../contexts/mixpanel.context';
import { daysPassedSinceTimestamp } from '../../utils/daysPassedSinceTimestamp';

export default function WorkspacePage() {
  const mixpanel = useMixpanel();

  const router = useRouter();
  const workspaceId = router.query.id as string;

  const { mutate: getWorkspaces, data: workspaces, isLoading } = useGetWorkspaces();

  const { mutate: archive, isLoading: isArchiving } = useArchiveWorkspace({
    onSuccess: () => {
      const workspace = workspaces?.[0];
      if (workspace) {
        mixpanel.track('workspace_archived', {
          'workspace_lifetime_days': daysPassedSinceTimestamp(workspace?.createdAt),
        });
      }

      void router.push('/dashboard');
    },
  });

  const handleArchive = () => {
    void archive({ id: workspaceId });
  };

  useEffect(() => {
    if (typeof router.query.id === 'string') {
      getWorkspaces({ id: workspaceId });
    }
  }, []);

  if (isLoading || isArchiving) {
    return <Skeleton animation='wave' />;
  }

  if (!workspaces || workspaces?.length == 0) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Stack spacing={2}>
          <Typography variant='h1'>
            {workspaces[0].name}
          </Typography>
          {workspaces[0].notes && <NoteList notes={workspaces[0].notes} />}
          <Box>
            <Button onClick={() => {
              void router.push({
                pathname: '/note/create', query: {
                  workspace: workspaceId,
                },
              });
            }} variant='contained'>add new note</Button>
          </Box>
          <Box>
            <Button onClick={handleArchive} variant='contained' color='error'>
              archive workspace
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
