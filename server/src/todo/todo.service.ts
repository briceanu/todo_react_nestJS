import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
// import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

@Injectable()
export class TodoService {
  private logger = new Logger();
  constructor(
    //this InjectRepository is from typeORM
    @InjectRepository(Todo)
    private readonly taskRepository: Repository<Todo>,
  ) {}
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { todo, status } = createTodoDto;
    const saveTodo = this.taskRepository.create({
      todo,
      status,
    });
    await this.taskRepository.save(saveTodo);

    return saveTodo;
  }

  async getAllTasks(): Promise<Todo[]> {
    const todos = await this.taskRepository.find();
    return todos;
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.taskRepository.findOne({ where: { id } });
    return todo;
  }

  async update(id: string, statusOfTodo: boolean): Promise<Todo> {
    const updateTodo = await this.taskRepository.findOne({
      where: { id },
    });
    updateTodo.status = statusOfTodo;
    await this.taskRepository.save(updateTodo);
    this.logger.verbose(updateTodo.status);
    return updateTodo;
  }

  async removeTodo(id: string): Promise<void> {
    const result = await this.taskRepository.delete({
      id: id.toString(),
    });
    if (result.affected === 0) {
      //user.affected is a property of the user object console.log(user)
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
