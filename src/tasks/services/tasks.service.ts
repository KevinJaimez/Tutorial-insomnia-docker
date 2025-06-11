import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './../entities/task.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task) private tasksRepo: Repository<Task>,
  ) {}

  findAll() {
    return this.tasksRepo.find();
  }

  findOne(id: number) {
    return this.tasksRepo.findOne({ where: { id } });
  }

  create(body: any) {
    const newTask = new Task();
    newTask.name = body.name;
    return this.tasksRepo.save(newTask);
  }

  async update(id: number, body: any) {
    const task = await this.tasksRepo.findOne({ where: { id } });
    if (!task) {
      throw new Error('Task not found'); // Maneja error si quieres
    }
    this.tasksRepo.merge(task, body);
    return this.tasksRepo.save(task);
  }

  async remove(id: number) {
    await this.tasksRepo.delete(id);
    return true;
  }
}
