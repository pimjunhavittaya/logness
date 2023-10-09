export type Note = {
  id: string;
  name: string;
  owner: string;
  workspace: string;
  createdAt: number;
  editedAt?: number;
  content: Array<Element>;
}

export enum Element {
  Text = "TEXT",
  Quote = "QUOTE",
  Calendar = "CALENDAR",
  Table = "TABLE",
  Image = "IMAGE"
}

export const Elements = Object.keys(Element);
