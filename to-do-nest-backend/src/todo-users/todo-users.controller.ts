import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoUsersService } from './todo-users.service';
import { CreateTodoUserDto } from './dto/create-todo-user.dto';
import { UpdateTodoUserDto } from './dto/update-todo-user.dto';

@Controller('todo-users')
export class TodoUsersController {
  constructor(private readonly todoUsersService: TodoUsersService) {}

  @Post('addUser')
  async create(@Body() createTodoUserDto: CreateTodoUserDto) {
    return await this.todoUsersService.create(createTodoUserDto);
  }

  @Post('verifyUser')
  async findUser(@Body() createTodoUserdto:CreateTodoUserDto){
    return await this.todoUsersService.findUser(createTodoUserdto);
  }

  @Get('getUser/:username')//specific user
  findOne(@Param('username') username: string) {
    return this.todoUsersService.findOneUser(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoUserDto: UpdateTodoUserDto) {
    return this.todoUsersService.update(+id, updateTodoUserDto);
  }

  @Delete('deleteUser')
  async remove(@Body('id') id: number) {
    await this.todoUsersService.remove(id);
  }
}
