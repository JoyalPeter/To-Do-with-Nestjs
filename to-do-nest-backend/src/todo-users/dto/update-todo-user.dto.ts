import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoUserDto } from './create-todo-user.dto';

export class UpdateTodoUserDto extends PartialType(CreateTodoUserDto) {}
