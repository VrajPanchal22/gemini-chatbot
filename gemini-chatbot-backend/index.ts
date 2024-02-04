import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;
console.log("PORT:", port);

app.use("/", (req: express.Request, res: express.Response) => {
  res.send("Server is running.");
});

app.listen(port, () => {
  console.log(`Server started on PORT: ${port}!!`);
});
