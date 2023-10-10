import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import { Note } from '../../../types/note';

const noteDirectory = '/tmp/notes.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let notes: Array<Note> = [];

  try {
    const jsonData = await fs.readFile(noteDirectory, 'utf8');
    notes = JSON.parse(jsonData) ?? [];
  } catch (e) {
    console.log('[note edit] file not found');
  }

  const { id, name, content } = req.body;

  const data = notes.find((note) => {
    return id ? note.id === id : true;
  });

  if (!data) {
    return res.status(400);
  }

  data.name = name;
  data.content = content;
  data.editedAt = (new Date()).getTime();

  const updatedData = JSON.stringify(notes);
  await fs.writeFile(noteDirectory, updatedData);

  res.status(200).json(data);
}
