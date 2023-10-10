import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../types/user';

const userDirectory = '/tmp/users.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let users: Array<User> = [];

  try {
    const jsonData = await fs.readFile(userDirectory, 'utf8');
    users = JSON.parse(jsonData) ?? [];
  } catch (e) {
    console.log('[deactivate] file not found');
  }

  const { id } = req.body;
  const data = users.filter((user) => user.id !== id);

  const updatedData = JSON.stringify(data);
  await fs.writeFile(userDirectory, updatedData);

  return res.status(200).send(true);
}
