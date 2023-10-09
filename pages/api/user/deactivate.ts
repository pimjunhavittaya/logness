import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../types/user';

const userDirectory = path.join(process.cwd(), 'json/users.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jsonData = await fs.readFile(userDirectory, 'utf8');
  const users: Array<User> = JSON.parse(jsonData);

  const { id } = req.body;
  const data = users.filter((user) => user.id !== id);

  const updatedData = JSON.stringify(data);
  await fs.writeFile(userDirectory, updatedData);

  return res.status(200).send(true);
}
