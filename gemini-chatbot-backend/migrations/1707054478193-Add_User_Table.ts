import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserTable1707054478193 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL, "email" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, CONSTRAINT "UQ_2ed4da931342847072a044906ea" UNIQUE ("email"), CONSTRAINT "PK_e4f6b8458aa634ee6af2ea68635" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
