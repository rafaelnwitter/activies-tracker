import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  public async create(@Body() createTaskDto: CreateTaskDto) {
    const resp = await this.taskService.create(createTaskDto);

    return resp;
  }

  @Get()
  public async findAll() {
    const resp = await this.taskService.findAll();

    return resp;
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    const resp = await this.taskService.findOne(+id);

    return resp;
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const resp = await this.taskService.update(+id, updateTaskDto);

    return resp;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param('id') id: string) {
    await this.taskService.remove(+id);
  }
}
