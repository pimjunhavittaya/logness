import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { SubscriptionPlan, User } from '../../../types/user';

const userDirectory = path.join(process.cwd(), 'json/users.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jsonData = await fs.readFile(userDirectory, 'utf8');
  const users: Array<User> = JSON.parse(jsonData);

  const { email, age, gender } = req.body;

  const emailUsed = users.some((user) => user.email === email);
  if (emailUsed) {
    return res.status(409);
  }

  const newUser = {
    id: `usr-${uuidv4()}`,
    email,
    company: '',
    age,
    gender,
    subscriptionPlan: SubscriptionPlan.Free,
    newsletterSubscribed: false,
  };
  users.push(newUser);

  const updatedData = JSON.stringify(users);
  await fs.writeFile(userDirectory, updatedData);

  return res.status(200).json(newUser);
}
