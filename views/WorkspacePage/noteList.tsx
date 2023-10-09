import { List, ListItem } from '@mui/material';
import { Note } from 'types/note';
import ListItemIcon from '@mui/material/ListItemIcon';
import NoteIcon from '@mui/icons-material/Note';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { useCallback } from 'react';
import { useRouter } from 'next/router';


export type NoteListProps = {
  notes: Array<{ id: string; name: string; }>;
}

export default function NoteList({ notes }: NoteListProps) {
  const router = useRouter();

  const openPage = useCallback((link) => {
    if (link) {
      void router.push(link);
    }
  }, []);

  return (
    <List>
      {notes.map((note) => (
        <ListItem key={note.id} disableGutters>
          <ListItemButton sx={{ pl: 4 }} onClick={() => {
            openPage(`/note/${note.id}`);
          }}>
            <ListItemIcon><NoteIcon /></ListItemIcon>
            <ListItemText primary={note.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
