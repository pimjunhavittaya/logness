import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { Note } from '../../../types/note';

const noteDirectory = path.join(process.cwd(), 'json/notes.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jsonData = await fs.readFile(noteDirectory, 'utf8');
  const notes: Array<Note> = JSON.parse(jsonData);

  const { name, workspace, owner, content } = req.body;
  const newNote: Note = {
    id: `nt-${uuidv4()}`,
    name,
    workspace,
    owner,
    content,
    createdAt: (new Date()).getTime(),

  };

  notes.push(newNote);

  const updatedData = JSON.stringify(notes);
  await fs.writeFile(noteDirectory, updatedData);

  res.status(200).json(newNote);
}
