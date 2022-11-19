import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoItemsService } from './todo-items.service';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { TodoUsersService } from 'src/todo-users/todo-users.service';

@Controller('todo')
export class TodoItemsController {
  constructor(private readonly todoItemsService: TodoItemsService, private readonly todoUsersService: TodoUsersService) {}

  @Post('add')
  async create(@Body() createTodoItemDto: CreateTodoItemDto) {
    const user=await this.todoUsersService.findOne(createTodoItemDto.user)
    return this.todoItemsService.create(createTodoItemDto,user);
  }

  // @Get('display')
  // findAll(@Body('user') user: number) {
  //   return this.todoItemsService.findAll(user);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.todoItemsService.findOne(+id);
  // }

  @Patch('update')
  update(@Body() updateTodoItemDto: UpdateTodoItemDto) {
    return this.todoItemsService.update(updateTodoItemDto);
  }

  @Delete('delete')
  remove(@Body('id') id: number, @Body('userId') userId:number) {
    return this.todoItemsService.remove(id,userId);
  }
}
