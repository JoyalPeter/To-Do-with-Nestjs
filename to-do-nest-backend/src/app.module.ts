import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItemsModule } from './todo-items/todo-items.module';
import { TodoItem } from './todo-items/entities/todo-item.entity';
import { TodoUsersModule } from './todo-users/todo-users.module';
import { TodoUser } from './todo-users/entities/todo-user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestjs',
      entities: [TodoItem,TodoUser],
      synchronize: true,
    }), TodoItemsModule, TodoUsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
