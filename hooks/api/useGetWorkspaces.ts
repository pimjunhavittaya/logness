import { useMutation, UseMutationOptions } from 'react-query';
import { WorkspaceList } from '../../types/workspace';
import { useAuthContext } from '../../contexts/auth.context';

export type getWorkspacesParams = {
  id?: string;
} | undefined;

export const useGetWorkspaces = (options?: UseMutationOptions<WorkspaceList, unknown, getWorkspacesParams>) => {
  const { user } = useAuthContext();

  return useMutation<WorkspaceList, Error, getWorkspacesParams>(async (params: getWorkspacesParams): Promise<WorkspaceList> => {
    if (!user) {
      return [];
    }

    const response = await fetch('/api/workspace/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ owner: user.id, id: params?.id }),
    });
    const jsonRes = await response.json();

    if (!response.ok) {
      throw new Error(jsonRes);
    } else {
      return jsonRes as WorkspaceList;
    }
  }, options);
};
