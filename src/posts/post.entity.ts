import { User } from '../users/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId,
    UpdateDateColumn,
} from 'typeorm';
import { Length } from 'class-validator';

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Length(3, 60, { message: `The length of post title can't be shorter than 3 and longer than 60 ` })
    @Column({name: 'name'})
    title: string;

    @Column()
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => User, user => user.posts, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @RelationId((post: Post) => post.user)
    userId: number;
}
