import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import { Workspace } from '../../../types/workspace';
import path from 'path';
import { Note } from '../../../types/note';

const workspaceDirectory = '/tmp/workspaces.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let workspaces: Array<Workspace> = [];

  try {
    const jsonData = await fs.readFile(workspaceDirectory, 'utf8');
    workspaces = JSON.parse(jsonData) ?? [];
  } catch (e) {
    console.log('[workspace archive] file not found');
  }

  const { id } = req.body;

  const updatedWorkspaces = workspaces.filter((workspace) => (workspace.id !== id))

  const updatedData = JSON.stringify(updatedWorkspaces);
  await fs.writeFile(workspaceDirectory, updatedData);

  return res.status(200).send(true);
}
