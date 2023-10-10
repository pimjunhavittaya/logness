import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { Note } from '../../../types/note';

const noteDirectory = '/tmp/notes.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let notes: Array<Note> = [];

  try {
    const jsonData = await fs.readFile(noteDirectory, 'utf8');
    notes = JSON.parse(jsonData) ?? [];
  } catch (e) {
    console.log('[note get] file not found');
  }

  const { id } = req.query;

  const data = notes.find((note) => {
    return id ? note.id === id : true;
  })

  if (data) {
    return res.status(200).json(data);
  }

  return res.status(400);
}
