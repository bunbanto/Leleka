export interface Task {
  _id: string;
  userId: string;
  text: string;
  date: string;
  isActive: boolean;
}

export interface NewTask {
  text: string;
  date: string;
  isActive: boolean;
}

export interface patchTask {
  isActive: boolean;
}

export type TasksHttpResponse = {
  success: boolean;
  status: number;
  message: string;
  result: {
    data: Task[];
    totalPage: string;
  };
};
