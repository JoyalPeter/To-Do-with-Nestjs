import { Module } from '@nestjs/common';
import { TodoItemsService } from './todo-items.service';
import { TodoItemsController } from './todo-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItem } from './entities/todo-item.entity';
import { TodoUser } from 'src/todo-users/entities/todo-user.entity';
import { TodoUsersService } from 'src/todo-users/todo-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItem,TodoUser])],
  controllers: [TodoItemsController],
  providers: [TodoItemsService,TodoUsersService]
})
export class TodoItemsModule {}
