import { Controller, Get, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('getTasks')
  async findAll(@Res() res): Promise<Task[]> {
    try {
      const tasks = await this.tasksService.findAll();
      return res.status(HttpStatus.OK).json(tasks);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching tasks' });
    }
  }

  @Post('createTasks')
  async create(@Body('task') taskNameToUpdate: string, @Body('completed') completed: boolean, @Res() res): Promise<Task> {
    try {
      const newTask = await this.tasksService.create(taskNameToUpdate,completed);
      return res.status(HttpStatus.CREATED).json(newTask);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error creating task' });
    }
  }

  @Post('deleteTasks')
  async delete(@Body('task') taskNameToDelete: string, @Res() res): Promise<any> {
    try {
      const result = await this.tasksService.delete(taskNameToDelete);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting task' });
    }
  }

  @Post('updateTasks')
  async update(@Body('task') taskNameToUpdate: string, @Body('completed') completed: boolean, @Res() res): Promise<any> {
    try {
      const updatedTask = await this.tasksService.update(taskNameToUpdate, completed);
      return res.status(HttpStatus.OK).json(updatedTask);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error updating task' });
    }
  }
}
