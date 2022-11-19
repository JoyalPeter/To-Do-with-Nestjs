import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoUserDto } from './dto/create-todo-user.dto';
import { UpdateTodoUserDto } from './dto/update-todo-user.dto';
import { TodoUser } from './entities/todo-user.entity';

@Injectable()
export class TodoUsersService {
  constructor(
    @InjectRepository(TodoUser)
    private userRepo: Repository<TodoUser>
  ){}

  async create(createTodoUserDto: CreateTodoUserDto) {
    const user=this.userRepo.create(createTodoUserDto)
    await this.userRepo.save(user);
  }

  findAll() {
    return `This action returns all todoUsers`;
  }

  findOne(userId: number) {
    return this.userRepo.findOne({where: {id:userId},relations:["items"]});
  }
  async findOneUser(username: string) {
    const user= await this.userRepo.findOne({where: {userName:username}});
    if(user) return user.id;
    return 0;
  }

  update(id: number, updateTodoUserDto: UpdateTodoUserDto) {
    return `This action updates a #${id} todoUser`;
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
  async findUser(createTodoUserdto:CreateTodoUserDto){
    const user= await this.userRepo.findOne({where:{userName:createTodoUserdto.userName},relations:["items"]})
    if(user){
      if(user.password===createTodoUserdto.password){
        return {items:user.items,id:user.id};
      }else{
        return {flag:-1};
      }
    }else{
      return {flag:0};
    }
  }
}
