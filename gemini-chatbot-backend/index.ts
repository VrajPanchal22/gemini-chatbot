import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import dataSource from "./database/ormconfig";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/auth", authRouter);

(async () => {
  const initPostgres = async () => {
    await dataSource.initialize();
    console.log("🚀 Postgres connected!!");
  };

  const port = parseInt(process.env.PORT as string, 10) || 5432;

  try {
    await initPostgres(); // <--- Database connection initialized
    app.listen(port, () => {
      console.log(`🚀 Server running on the port: ${port}`);
    });
  } catch (error) {
    console.log(`❌  Server error: ${error}`);
  }
})();
