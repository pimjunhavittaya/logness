import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { Note } from '../../../types/note';

const noteDirectory = path.join(process.cwd(), 'json/notes.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jsonData = await fs.readFile(noteDirectory, 'utf8');
  const notes: Array<Note> = JSON.parse(jsonData);

  const { id } = req.body;

  const updatedNotes = notes.filter((note) => (note.id !== id));

  const updatedData = JSON.stringify(updatedNotes);
  await fs.writeFile(noteDirectory, updatedData);

  return res.status(200).send(true);
}
