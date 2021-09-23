import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDTO } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus, TaskType } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private TaskRepo: Repository<Task>,
  ) {}

  public async create(createTaskRequest: CreateTaskDto) {
    const task: Task = new Task();
    task.title = createTaskRequest.title;
    task.description = createTaskRequest.description;
    if (createTaskRequest.type == 0) {
      task.type = TaskType.Development;
    } else {
      task.type = TaskType.Support;
    }
    task.status = TaskStatus.Created;

    await this.TaskRepo.save(task);

    const taskDTO: TaskDTO = this.entityToDTO(task);

    return taskDTO;
  }

  private entityToDTO(task: Task): TaskDTO {
    const taskDTO: TaskDTO = new TaskDTO();
    taskDTO.id = task.id;
    taskDTO.title = task.title;
    taskDTO.description = task.description;
    taskDTO.type = task.type;
    taskDTO.status = task.status;

    return taskDTO;
  }

  public async findAll() {
    const tasks: Task[] = await this.TaskRepo.find();
    const tasksDTO: TaskDTO[] = tasks.map((x) => this.entityToDTO(x));

    return tasksDTO;
  }

  public async findOne(id: number) {
    const task: Task = await this.TaskRepo.findOne(id);

    if (!task)
      throw new NotFoundException(`Task with the id ${id} was not found`);

    const taskDTO: TaskDTO = this.entityToDTO(task);

    return taskDTO;
  }

  public async update(id: number, updateTaskRequest: UpdateTaskDto) {
    // fetch and check if the task exist
    if (await this.findOne(id))
      // update the properties on the task
      return await this.TaskRepo.update(id, updateTaskRequest);
  }

  public async remove(id: number) {
    // fetch and check if the task exist
    if (await this.findOne(id)) return this.TaskRepo.delete(id);
  }
}
