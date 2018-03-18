import serverless from "serverless-http";
import express from "express";
import ingest from "./routes/ingest";
import bodyParser from "body-parser";
import { load as dotenv } from "dotenv-safe";
dotenv();

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.post("/ingest", ingest);
app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
export const handler = serverless(app);
