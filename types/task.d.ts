export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  userId: number;
};
