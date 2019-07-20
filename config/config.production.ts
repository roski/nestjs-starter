export const config = {
    database: {
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: ['db/migrations/*.ts'],
        synchronize: false,
        migrationsRun: true
    },
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
};
