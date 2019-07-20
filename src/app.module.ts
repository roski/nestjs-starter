import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './shared/config/config.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService) => (configService.typeOrmConfig),
            inject: [ConfigService],
        }),
        UsersModule,
        PostsModule,
        SharedModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
