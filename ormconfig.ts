import config from './db/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const dbConfig: PostgresConnectionOptions = config.database;

export = {
    host: dbConfig.host,
    type: dbConfig.type,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [
        ...dbConfig.entities,
    ],
    migrations: [
        ...dbConfig.migrations,
    ],
    cli: {
        migrationsDir: dbConfig.cli.migrationsDir,
    },
    synchronize: dbConfig.synchronize,
};
