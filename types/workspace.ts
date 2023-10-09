export type Workspace = {
  id: string;
  name: string;
  owner: string;
  createdAt: number;
  notes?: Array<{
    id: string;
    name: string;
  }>
}

export type WorkspaceList = Array<Workspace>;

