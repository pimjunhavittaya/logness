import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { Workspace } from '../../../types/workspace';

const workspaceDirectory = '/tmp/workspaces.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let workspaces: Array<Workspace> = [];

  try {
    const jsonData = await fs.readFile(workspaceDirectory, 'utf8');
    workspaces = JSON.parse(jsonData) ?? [];
  } catch (e) {
    console.log('[workspace create] file not found');
  }

  const { name, owner } = req.body;
  const newWorkspace = {
    id: `wsp-${uuidv4()}`,
    name,
    owner,
    createdAt: (new Date()).getTime(),
  };

  workspaces.push(newWorkspace);

  const updatedData = JSON.stringify(workspaces);
  await fs.writeFile(workspaceDirectory, updatedData);

  res.status(200).json(newWorkspace);
}
