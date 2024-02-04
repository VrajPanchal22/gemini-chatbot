import { EntitySchema } from "typeorm";
import { User } from "./user.entity";

export const UserSchema = new EntitySchema<User>({
  name: "User",
  target: User,
  columns: {
    id: {
      type: "uuid",
      createDate: true,
    },
    email: {
      name: "email",
      type: String,
      createDate: true,
    },
    firstName: {
      name: "firstname",
      type: String,
      createDate: true,
    },
    lastName: {
      name: "lastname",
      type: String,
      createDate: true,
    },
    createdAt: {
      name: "createdAt",
      type: Date,
      createDate: true,
    },
    updatedAt: {
      name: "updatedAt",
      type: Date,
      updateDate: true,
      nullable: true,
    },
  },
});
