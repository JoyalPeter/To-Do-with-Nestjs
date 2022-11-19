import { TodoUser } from "src/todo-users/entities/todo-user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TodoItem {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    item: string;
    
    @ManyToOne(()=>TodoUser,(todoUser)=>todoUser.items)
    @JoinColumn({ name: 'user' })
    user:TodoUser
}

