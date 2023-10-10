import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { Workspace } from '../../../types/workspace';
import { Note } from '../../../types/note';

const workspaceDirectory = '/tmp/workspaces.json';
const noteDirectory = '/tmp/notes.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let workspaces: Array<Workspace> = [];

  try {
    const jsonData = await fs.readFile(workspaceDirectory, 'utf8');
    workspaces = JSON.parse(jsonData) ?? [];
  } catch (e) {
    console.log('[workspace get] file not found');
  }

  let notes: Array<Note> = [];
  try {
    const jsonData = await fs.readFile(noteDirectory, 'utf8');
    notes = JSON.parse(jsonData) ?? [];
  } catch (e) {
    console.log('[workspace get] note file not found');
  }

  const { id, owner } = req.body;

  const data = workspaces.filter((workspace) => {
    if (workspace.owner === owner) {

      workspace['notes'] = notes.filter((note) => note.workspace === workspace.id);
      return id ? workspace.id === id : true;
    }
    return false;
  })

  res.status(200).json(data);
}
