import dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  // entities: ["dist/entities/*.js}"],
  // migrations: ["dist/migrations/*.js}"],
  entities: ["entities/*{.ts, .js}"],
  migrations: ["migrations/*{.ts, .js}"],
  synchronize: true,
  logging: true,
  migrationsRun: true,
  ssl: true,
  extra: {
    sslmode: "require",
  },
});

export default dataSource;
