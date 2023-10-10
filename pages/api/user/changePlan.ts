import path from 'path';
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
    console.log('[changePlan] file not found');
  }

  const { id, newPlan } = req.body;
  const data = users.find((user) => user.id === id);

  if (data) {
    data.subscriptionPlan = newPlan;
    const updatedData = JSON.stringify(users);
    await fs.writeFile(userDirectory, updatedData);

    return res.status(200).json(data);
  }

  return res.status(400).send(
    {
      error: {
        message: 'User not found'
      }
    }
  );
}
