import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordFieldToUserTable1707538634520
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "password" character varying
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE "user" DROP COLUMN "password"
`);
  }
}
