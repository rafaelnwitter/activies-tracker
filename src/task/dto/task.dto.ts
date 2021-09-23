import { TaskStatus, TaskType } from '../entities/task.entity';

export class TaskDTO {
  id: number;
  title: string;
  description?: string;
  type: TaskType;
  status: TaskStatus;
}
