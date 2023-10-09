import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

const workspaceDirectory = path.join(process.cwd(), 'json/workspaces.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jsonData = await fs.readFile(workspaceDirectory, 'utf8');
  const workspaces = JSON.parse(jsonData);

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
