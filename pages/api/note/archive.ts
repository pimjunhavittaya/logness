import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { Note } from '../../../types/note';

const noteDirectory = '/tmp/notes.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let notes: Array<Note> = [];

  try {
    const jsonData = await fs.readFile(noteDirectory, 'utf8');
    notes = JSON.parse(jsonData) ?? [];
  } catch (e) {
    console.log('[note archive] file not found');
  }

  const { id } = req.body;

  const updatedNotes = notes.filter((note) => (note.id !== id));

  const updatedData = JSON.stringify(updatedNotes);
  await fs.writeFile(noteDirectory, updatedData);

  return res.status(200).send(true);
}
