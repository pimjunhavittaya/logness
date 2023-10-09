import { useMutation, UseMutationOptions } from 'react-query';
import { User } from '../../types/user';

export type loginParams = {
  email: string;
}

export const useLogin = (options?: UseMutationOptions<User, unknown, loginParams>) => {
  return useMutation<User, Error, loginParams, unknown>(async ({ email }: loginParams): Promise<User> => {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const jsonRes = await response.json();

    if (!response.ok) {
      throw new Error(jsonRes)
    } else {
      return jsonRes as User;
    }
  }, options);
};
