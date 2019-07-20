import {
    Injectable,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {
    }

    async findAllPosts(): Promise<PostDto[]> {
        const posts = await this.postsRepository.find();
        return posts.map(post => {
            return new PostDto(post);
        });
    }

    async findOnePost(id: number): Promise<PostDto> {
        const post = await this.postsRepository.findOne(id);
        if (!post) {
            throw new HttpException('No post found', HttpStatus.NOT_FOUND);
        }

        return new PostDto(post);
    }

    async createPost(userId: number, createPostDto: CreatePostDto): Promise<Post> {
        const user = await this.usersRepository.findOne(userId);
        const post = new Post();
        post.user = user;
        post.title = createPostDto.title;
        post.content = createPostDto.content;
        try {
            return await this.postsRepository.save(post);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async getUserPost(id: number, userId: number): Promise<Post> {
        const post = await this.postsRepository.findOne(id);
        if (!post) {
            throw new HttpException('No post found', HttpStatus.NOT_FOUND);
        }
        if (post.userId !== userId) {
            throw new HttpException(
                'You are unauthorized to manage this post',
                HttpStatus.UNAUTHORIZED,
            );
        }

        return post;
    }

    async updatePost(
        id: number,
        userId: number,
        updatePostDto: UpdatePostDto,
    ): Promise<Post> {
        const post = await this.getUserPost(id, userId);

        post.title = updatePostDto.title || post.title;
        post.content = updatePostDto.content || post.content;

        try {
            return await this.postsRepository.save(post);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deletePost(id: number, userId: number): Promise<Post> {
        const post = await this.getUserPost(id, userId);
        await this.postsRepository.delete(post);
        return post;
    }
}
