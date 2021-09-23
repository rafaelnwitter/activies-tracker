import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private TaskRepo: Repository<Task>,
  ) {}
  create(createTaskDto: CreateTaskDto) {
    return this.TaskRepo.save(createTaskDto);
  }

  findAll() {
    return this.TaskRepo.find();
  }

  findOne(id: number) {
    return this.TaskRepo.findOneOrFail(id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.TaskRepo.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.TaskRepo.delete(id);
  }
}
