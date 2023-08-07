import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('/create')
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }

  @Get('todos')
  getAll(): Promise<Todo[]> {
    return this.todoService.getAllTasks();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Put('/update/:id')
  update(
    @Param('id') id: string,
    @Body('status') statusOfTodo: boolean,
  ): Promise<Todo> {
    return this.todoService.update(id, statusOfTodo);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.todoService.removeTodo(id);
  }
}
