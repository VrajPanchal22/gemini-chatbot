import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMessagesTable1733659229249 implements MigrationInterface {
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
        CONSTRAINT "FK_userId" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE,
        CONSTRAINT "PK_messageId" PRIMARY KEY ("messageId")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "message";
    `);
  }
}
