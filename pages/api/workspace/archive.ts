import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import { Workspace } from '../../../types/workspace';
import path from 'path';

const workspaceDirectory = path.join(process.cwd(), 'json/workspaces.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const workspaceJsonData = await fs.readFile(workspaceDirectory, 'utf8');
  const workspaces: Array<Workspace> = JSON.parse(workspaceJsonData);

  const { id } = req.body;

  const updatedWorkspaces = workspaces.filter((workspace) => (workspace.id !== id))

  const updatedData = JSON.stringify(updatedWorkspaces);
  await fs.writeFile(workspaceDirectory, updatedData);

  return res.status(200).send(true);
}
