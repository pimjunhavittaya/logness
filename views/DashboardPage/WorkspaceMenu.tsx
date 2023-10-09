import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import NoteIcon from '@mui/icons-material/Note';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Workspace } from '../../types/workspace';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

export type WorkspaceMenuProps = {
  workspace: Workspace;
}

export default function WorkspaceMenu({ workspace }: WorkspaceMenuProps) {
  const router = useRouter();

  const openPage = useCallback((link) => {
    if (link) {
      void router.push(link);
    }
  }, [])

  return (
    <>
      <List>
        <ListItem key={workspace.id} disablePadding>
          <ListItemButton sx={{ pl: 2 }} onClick={() => { openPage(`/workspace/${workspace.id}`); }} >
            <ListItemIcon>
             <SpaceDashboardIcon />
            </ListItemIcon>
            <ListItemText primary={workspace.name} />
          </ListItemButton>
        </ListItem>
        {
          workspace.notes?.map((note) => (
            <ListItem key={note.id} disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => {
                openPage(`/note/${note.id}`);
              }}>
                <ListItemIcon><NoteIcon /></ListItemIcon>
                <ListItemText primary={note.name} />
              </ListItemButton>
            </ListItem>
          ))
        }
      </List>
      <Divider />
    </>
  );
}
