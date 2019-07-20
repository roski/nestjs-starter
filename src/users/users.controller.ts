import { UserLoginRequestDto } from './dto/user-login-request.dto';
import {
    Controller,
    Get,
    Post,
    Body,
    HttpCode,
    Delete,
    Req,
    UseGuards,
    Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiUseTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiUseTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    @ApiOkResponse({ type: UserLoginResponseDto })
    registerUser(
        @Body() createUserDto: CreateUserDto,
    ): Promise<UserLoginResponseDto> {
        return this.usersService.createUser(createUserDto);
    }

    @Post('login')
    @HttpCode(200)
    @ApiOkResponse({ type: UserLoginResponseDto })
    login(
        @Body() userLoginRequestDto: UserLoginRequestDto,
    ): Promise<UserLoginResponseDto> {
        return this.usersService.login(userLoginRequestDto);
    }

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: [UserDto] })
    findAll(): Promise<UserDto[]> {
        return this.usersService.findAllUsers();
    }

    @Get('me')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UserDto })
    async getUser(@Req() request): Promise<UserDto> {
        return this.usersService.getUser(request.user.id);
    }

    @Put('me')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UserDto })
    updateUser(
        @Body() updateUserDto: UpdateUserDto,
        @Req() request,
    ): Promise<UserDto> {
        return this.usersService.updateUser(request.user.id, updateUserDto);
    }

    @Delete('me')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UserDto })
    deleteUser(@Req() request): Promise<UserDto> {
        return this.usersService.deleteUser(request.user.id);
    }
}
