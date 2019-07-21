import {
    MigrationInterface,
    QueryRunner,
} from 'typeorm';

export class InitialMigration1563718066762 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "user_gender_enum" AS ENUM('FEMALE', 'MALE')`);
        await queryRunner.query(`CREATE TABLE "user"
                                 (
                                     "id"        SERIAL             NOT NULL,
                                     "email"     character varying  NOT NULL,
                                     "password"  character varying  NOT NULL,
                                     "firstName" character varying  NOT NULL,
                                     "lastName"  character varying  NOT NULL,
                                     "gender"    "user_gender_enum" NOT NULL,
                                     "birthday"  TIMESTAMP          NOT NULL,
                                     "createdAt" TIMESTAMP          NOT NULL DEFAULT now(),
                                     "updatedAt" TIMESTAMP          NOT NULL DEFAULT now(),
                                     CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                                     CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
                                 )`);
        await queryRunner.query(`CREATE TABLE "post"
                                 (
                                     "id"        SERIAL            NOT NULL,
                                     "name"      character varying NOT NULL,
                                     "content"   character varying NOT NULL,
                                     "createdAt" TIMESTAMP         NOT NULL DEFAULT now(),
                                     "updatedAt" TIMESTAMP         NOT NULL DEFAULT now(),
                                     "userId"    integer,
                                     CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")
                                 )`);
        await queryRunner.query(`ALTER TABLE "post"
            ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "post"
            DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_gender_enum"`);
    }

}
