import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoUserDto } from 'src/todo-users/dto/create-todo-user.dto';
import { TodoUser } from 'src/todo-users/entities/todo-user.entity';
import { Repository } from 'typeorm';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { TodoItem } from './entities/todo-item.entity';

@Injectable()
export class TodoItemsService {
  constructor(
    @InjectRepository(TodoItem)
    private itemRepo: Repository<TodoItem>,
    @InjectRepository(TodoUser)
    private userRepo: Repository<TodoUser>
  ){}

  async create(createTodoItemDto: CreateTodoItemDto, userId : CreateTodoUserDto) {
    await this.itemRepo.save({item:createTodoItemDto.item, user: userId} );
    const user=await this.userRepo.findOne({where:{id:createTodoItemDto.user},relations:["items"]})
    return  {items:user.items};
  }

  findAll(userId:number) {
    return "nill";
  }

  findOne(id: number) {
    return this.itemRepo.find({where:{id:id},relations:["user"]});
  }

  async update(updateTodoItemDto: UpdateTodoItemDto) {
    await this.itemRepo.update({id: updateTodoItemDto.id}, {item:updateTodoItemDto.item});
    const user=await this.userRepo.findOne({where:{id:updateTodoItemDto.userId},relations:["items"]})
    return {items:user.items};
  }

  async remove(id: number,userId:number) {
    await this.itemRepo.delete(id);
    const user=await this.userRepo.findOne({where:{id:userId},relations:["items"]})
    return  {items:user.items};
  }
}
