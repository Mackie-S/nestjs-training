import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Body,
  UseGuards,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TodoService } from './todo.service';

@UseGuards(AuthGuard('jwt'))
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTasks(@Req() req: any): Promise<Task[]> {
    return this.todoService.getTasks(req.user.id);
  }

  @Get(':id')
  getTaskById(
    @Req() req: any,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<Task> {
    return this.todoService.getTaskById(req.user.id, taskId);
  }

  @Post()
  createTask(@Req() req: any, @Body() dto: CreateTaskDto): Promise<Task> {
    return this.todoService.createTask(req.user.id, dto);
  }

  @Patch(':id')
  updateTaskById(
    @Req() req: any,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    return this.todoService.updateTaskById(req.user.id, taskId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTaskById(
    @Req() req: any,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<void> {
    return this.todoService.deleteTaskById(req.user.id, taskId);
  }
}
