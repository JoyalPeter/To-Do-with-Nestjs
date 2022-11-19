import { Test, TestingModule } from '@nestjs/testing';
import { TodoUsersService } from './todo-users.service';

describe('TodoUsersService', () => {
  let service: TodoUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoUsersService],
    }).compile();

    service = module.get<TodoUsersService>(TodoUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
