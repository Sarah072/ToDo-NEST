import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async create(taskNameToUpdate: string, completed: boolean): Promise<Task> {
    const createdTask = new this.taskModel({task: taskNameToUpdate,completed: completed});
    return createdTask.save();
  }

  async delete(taskNameToDelete: string): Promise<any> {
    const deletedTask = await this.taskModel.findOneAndDelete({ task: taskNameToDelete }).exec();
    if (!deletedTask) {
      throw new NotFoundException('Task not found');
    }
    return { message: 'Task deleted successfully' };
  }

  async update(taskNameToUpdate: string, completed: boolean): Promise<any> {
    const task = await this.taskModel.findOne({ task: taskNameToUpdate });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    task.completed = completed;
    task.completedTime = completed ? new Date() : null;

    return task.save();
  }
}
