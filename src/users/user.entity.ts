import { Gender } from '../shared/enum/gender';
import { Post } from '../posts/post.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';

@Unique(['email'])
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @IsEmail()
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column('text')
    gender: Gender;

    @Column()
    birthday: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => Post, post => post.user, { cascade: true })
    posts: Post[];
}
