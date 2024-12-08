import dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST, // Ensure this matches Railway's DB_HOST
  port: Number(process.env.POSTGRES_PORT) || 5432, // Default PostgreSQL port
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ["dist/entities/*.js"], // Fixed typo
  migrations: ["dist/migrations/*.js"],
  synchronize: false, // Disable for production
  logging: true,
  migrationsRun: true, // Automatically run migrations
  ssl: true, // Enable SSL
  extra: {
    ssl: {
      rejectUnauthorized: false, // Accept self-signed certs
    },
  },
});

export default dataSource;
