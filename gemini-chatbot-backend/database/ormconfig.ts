import dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  entities: ["./entities/*.ts"],
  migrations: ["./migrations/*.ts"],
  ssl: true,
  extra: {
    sslmode: "require",
  },
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
