import { TodoItem } from "src/todo-items/entities/todo-item.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TodoUser {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    userName:string
    
    @Column()
    password:string

    @OneToMany(()=>TodoItem,(todoitem)=>todoitem.user)
    items:TodoItem[]
}
