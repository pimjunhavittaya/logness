import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { Note } from '../../../types/note';

const noteDirectory = '/tmp/notes.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let notes: Array<Note> = [];

  try {
    const jsonData = await fs.readFile(noteDirectory, 'utf8');
    notes = JSON.parse(jsonData) ?? [];
  } catch (e) {
    console.log('[note create] file not found');
  }

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
