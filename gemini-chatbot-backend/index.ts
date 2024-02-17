import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import dataSource from "./database/ormconfig";
import cookieParser from "cookie-parser";
import messageRouter from "./routes/message.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/auth", authRouter);
app.use("/message", messageRouter);

(async () => {
  const initPostgres = async () => {
    await dataSource.initialize();
    console.log("🚀 Postgres connected!!");
  };

  const port = parseInt(process.env.DATABASE_PORT as string, 10);

  try {
    await initPostgres();
    app.listen(port, () => {
      console.log(`🚀 Server running on the port: ${port}`);
    });
  } catch (error) {
    console.log(`❌  Server error: ${error}`);
  }
})();
