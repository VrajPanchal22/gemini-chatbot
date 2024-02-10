import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../entities/User";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export class encrypt {
  static async encryptpass(password: string) {
    return bcrypt.hashSync(password, 12);
  }
  static comparepassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }
}
