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
  entities: ["entities/*{.ts, .js}"],
  synchronize: true,
  logging: true,
  migrations: ["migrations/*{.ts, .js}"],
  migrationsRun: true,
  ssl: true,
  extra: {
    sslmode: "require",
  },
});

export default dataSource;
