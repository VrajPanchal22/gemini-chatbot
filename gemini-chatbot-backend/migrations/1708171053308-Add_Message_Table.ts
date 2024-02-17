import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMessagesTable1708169880401 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE "message" (
        "messageId" uuid NOT NULL,
        "conversationId" uuid NOT NULL,
        "userId" uuid NOT NULL,
        "interactionId" uuid NOT NULL,
        "content" character varying NOT NULL,
        "isUser" boolean NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP,
        FOREIGN KEY ("userId") REFERENCES users("id") ON DELETE CASCADE)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE messages;
    `);
  }
}
