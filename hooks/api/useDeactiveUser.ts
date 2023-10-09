import { useMutation, UseMutationOptions } from 'react-query';
import { useAuthContext } from '../../contexts/auth.context';

export type DeactivateUserParams = {
  id: string;
}

export const useDeactivateUser = (options?: UseMutationOptions<boolean, unknown, DeactivateUserParams>) => {
  const { user } = useAuthContext();

  return useMutation<boolean, Error, DeactivateUserParams>(
    async ({ id }: DeactivateUserParams): Promise<boolean> => {
      if (!user) {
        throw new Error('Login to deactivate user');
      }

      const response = await fetch('/api/user/deactivate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const jsonRes = await response.json();

      if (!response.ok) {
        throw new Error(jsonRes);
      }

      return true;
    },
    options,
  );

};
