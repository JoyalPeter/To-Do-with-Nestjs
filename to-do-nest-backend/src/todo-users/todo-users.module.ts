import { Module } from '@nestjs/common';
import { TodoUsersService } from './todo-users.service';
import { TodoUsersController } from './todo-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoUser } from './entities/todo-user.entity';
import { TodoItem } from 'src/todo-items/entities/todo-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoUser,TodoItem])],
  controllers: [TodoUsersController],
  providers: [TodoUsersService]
})
export class TodoUsersModule {}
