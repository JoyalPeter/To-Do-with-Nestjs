import { Module } from '@nestjs/common';
import { TodoUsersService } from './todo-users.service';
import { TodoUsersController } from './todo-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoUser } from './entities/todo-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoUser])],
  controllers: [TodoUsersController],
  providers: [TodoUsersService]
})
export class TodoUsersModule {}
