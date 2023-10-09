import MuiDrawer from '@mui/material/Drawer';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { useGetWorkspaces } from '../../hooks/api/useGetWorkspaces';
import WorkspaceMenu from './WorkspaceMenu';
import { useCreateWorkspace } from '../../hooks/api/useCreateWorkspace';

const drawerWidth = 240;

export default function Sidebar() {
  const { mutate: getWorkspaces, data: workspaces, isSuccess } = useGetWorkspaces();
  const { mutate: createWorkspace, isLoading, isSuccess: isCreatedSuccess } = useCreateWorkspace();

  const [workspaceName, setWorkspaceName] = useState<string>('');

  const handleAddWorkspace = () => {
    if (workspaceName) {
      createWorkspace({ name: workspaceName });
    }
  }

  useEffect(() => {
    getWorkspaces(undefined)
  }, [])

  useEffect(() => {
    if (isCreatedSuccess) {
      getWorkspaces(undefined);
    }
  }, [isCreatedSuccess]);

  return (
    <MuiDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          paddingTop: '8rem',
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {
        isSuccess && workspaces?.map((workspace) => (<WorkspaceMenu key={workspace.id} workspace={workspace} />))
      }
      <Stack sx={{ m: 2 }} spacing={1} >
        <TextField
          value={workspaceName}
          label="new workspace"
          variant="outlined"
          size="small"
          onChange={(event: ChangeEvent<HTMLInputElement>) => { setWorkspaceName(event.target.value) }} />
        <Button onClick={handleAddWorkspace} disabled={isLoading} variant="contained">Add</Button>
      </Stack>
    </MuiDrawer>
  )
}
