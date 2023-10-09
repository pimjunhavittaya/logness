import { useMutation, UseMutationOptions } from 'react-query';
import { Workspace } from '../../types/workspace';
import { useAuthContext } from '../../contexts/auth.context';

export type CreateWorkspaceParams = {
  name: string;
}

export const useCreateWorkspace = (options?: UseMutationOptions<Workspace, unknown, CreateWorkspaceParams>) => {
  const { user } = useAuthContext();

  return useMutation<Workspace, Error, CreateWorkspaceParams>(async ({ name }: CreateWorkspaceParams): Promise<Workspace> => {
    if (!user) {
      throw new Error('Login to create workspace');
    }

    const response = await fetch('/api/workspace/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ owner: user.id, name }),
    });
    const jsonRes = await response.json();

    if (!response.ok) {
      throw new Error(jsonRes);
    } else {
      return jsonRes as Workspace;
    }
  }, options);
};
