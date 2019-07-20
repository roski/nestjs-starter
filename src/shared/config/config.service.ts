import { Injectable } from '@nestjs/common';
import { JwtConfig } from './interfaces/jwt-config.interface';
import config from '../../../config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ConfigService {
    get typeOrmConfig(): TypeOrmModuleOptions {
        return config.database;
    }

    get jwtConfig(): JwtConfig {
        return {
            privateKey: config.jwtPrivateKey,
        };
    }
}
