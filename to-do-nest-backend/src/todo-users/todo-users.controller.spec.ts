import { Test, TestingModule } from '@nestjs/testing';
import { TodoUsersController } from './todo-users.controller';
import { TodoUsersService } from './todo-users.service';

describe('TodoUsersController', () => {
  let controller: TodoUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoUsersController],
      providers: [TodoUsersService],
    }).compile();

    controller = module.get<TodoUsersController>(TodoUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
