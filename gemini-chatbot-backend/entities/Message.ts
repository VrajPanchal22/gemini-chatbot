import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "messages" })
export class Message {
  @PrimaryGeneratedColumn("uuid")
  messageId: string;

  @Column("uuid")
  conversationId: string;

  @Column("uuid")
  userId: string;

  @Column("uuid")
  interactionId: string;

  @Column()
  content: string;

  @Column()
  isUser: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(
    conversationId: string,
    userId: string,
    interactionId: string,
    content: string,
    isUser: boolean
  ) {
    this.conversationId = conversationId;
    this.userId = userId;
    this.interactionId = interactionId;
    this.content = content;
    this.isUser = isUser;
  }
}
