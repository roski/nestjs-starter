import {
    Controller,
    Req,
    Body,
    Post,
    UseGuards,
    Get,
    Param,
    ParseIntPipe,
    Delete,
    Put,
} from '@nestjs/common';
import {
    ApiUseTags,
    ApiCreatedResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiImplicitParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';
import { PostDto } from './dto/post.dto';
import { Request } from 'express';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
@ApiUseTags('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) {
    }

    @Get()
    @ApiOkResponse({ type: [PostDto] })
    findAllPosts(): Promise<PostDto[]> {
        return this.postsService.findAllPosts();
    }

    @Get(':id')
    @ApiOkResponse({ type: PostDto })
    @ApiImplicitParam({ name: 'id', required: true })
    findOnePost(@Param('id', new ParseIntPipe()) id: number): Promise<PostDto> {
        return this.postsService.findOnePost(id);
    }

    @Post()
    @ApiCreatedResponse({ type: PostEntity })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    createPost(
        @Body() createPostDto: CreatePostDto,
        @Req() request,
    ): Promise<PostEntity> {
        return this.postsService.createPost(request.user.id, createPostDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: PostEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    updatePost(
        @Param('id', new ParseIntPipe()) id: number,
        @Req() request: Request,
        @Body() updatePostDto: UpdatePostDto,
    ): Promise<PostEntity> {
        return this.postsService.updatePost(id, request.user.id, updatePostDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: PostEntity })
    @ApiImplicitParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    deletePost(
        @Param('id', new ParseIntPipe()) id: number,
        @Req() request: Request,
    ): Promise<PostEntity> {
        return this.postsService.deletePost(id, request.user.id);
    }
}
