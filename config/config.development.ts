export const config = {
    database: {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'nest',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: ['db/migrations/*.ts'],
        synchronize: false,
        migrationsRun: true,
        logging: true,
        cli: {
            migrationsDir: 'db/migrations'
        }
    },
    jwtPrivateKey: 'jwtPrivateKey',
};
