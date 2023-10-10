import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { Workspace } from '../../../types/workspace';
import { Note } from '../../../types/note';

const workspaceDirectory = '/tmp/workspaces.json';
const noteDirectory = '/tmp/notes.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const workspaceJsonData = await fs.readFile(workspaceDirectory, 'utf8');
  const workspaces: Array<Workspace> = JSON.parse(workspaceJsonData) ?? [];

  const noteJsonData = await fs.readFile(noteDirectory, 'utf8');
  const notes: Array<Note> = JSON.parse(noteJsonData)

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
