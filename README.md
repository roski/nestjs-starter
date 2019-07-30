![Nest](assets/readme-images/readme-logo.png)
# Nest Starter [![Gitter](https://badges.gitter.im/NestJS-Starter/community.svg)](https://gitter.im/NestJS-Starter/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

This seed repo serves as an Nest starter for anyone looking to get up and running with [Nest](https://github.com/nestjs/nest) and TypeScript fast.

Starter kit project made with that demonstrates CRUD user, JWT authentication, CRUD posts and e2e tests.

### A Nest starter kit featuring

-   [TypeORM](https://typeorm.io/) (ORM) + [PostgreSQL](https://www.postgresql.org/)
-   [JWT](https://jwt.io/)
-   [Jest](https://jestjs.io/)
-   [Swagger](https://swagger.io/)

### Prerequisites

-   [Node.js](https://nodejs.org/) (>= 10.8.0)
-   [npm](https://www.npmjs.com/) (>= 6.5.0)

### Quick start
**Make sure you have Node version >= 10.8.0 and (NPM >= 6.5.0 or [Yarn](https://yarnpkg.com) )**
> Clone/Download the repo
```bash
# clone our repo
git clone https://github.com/roski/nestjs-starter.git

# change directory to our repo
cd nestjs-starter

# install the repo with npm
npm install

# if you're in China use cnpm
# https://github.com/cnpm/cnpm
```

**Setting up the database for development and test**

> Set Up a PostgreSQL

PostgreSQL database connection options are shown in the following table:

| Option   | Development | Test      |
| -------- | ----------- | --------- |
| Host     | localhost   | localhost |
| Port     | 5432        | 5432      |
| Username | postgres    | postgres  |
| Password | postgres    | postgres  |
| Database | nest        | nest_test |

**Running the app**

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
go to http://0.0.0.0:3000 or http://localhost:3000 in your browser

## Test

```bash
# e2e tests
$ npm run test
```

## Other commands


### formatting code

```bash
$ npm run format
```

### run linter

```bash
$ npm run lint
```

### generate migration

```bash
$ npm run db:mmigration:generate {name}
```
where `{name}` is how you want to call migration

### create migration

```bash
$ npm run db:mmigration:create {name}
```
where `{name}` is how you want to call migration

### run migrations

```bash
$ npm run db:migration:run
```

### revert migrations

```bash
$ npm run db:migration:revert
```

### reset database

```bash
$ npm run db:reset
```

### drop database

```bash
$ npm run db:drop
```

### sync database

```bash
$ npm run db:sync
```

## Run production configuration

```
NODE_ENV=production \
DATABASE_HOST=db.host.com \
DATABASE_PORT=5432 \
DATABASE_USER=user \
DATABASE_PASSWORD=pass \
DATABASE_DATABASE=database \
JWT_PRIVATE_KEY=jwtPrivateKey \
ts-node -r tsconfig-paths/register src/main.ts
```

## Swagger API docs

This project uses the Nest swagger module for API documentation. [NestJS Swagger](https://github.com/nestjs/swagger) - [www.swagger.io](https://swagger.io/)  
Swagger docs will be available at localhost:3000/swagger
