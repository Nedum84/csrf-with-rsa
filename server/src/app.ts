import express from "express";
import { json } from "body-parser";
import "express-async-errors"; //To enable async on route function
import { routes } from "./routes";
import { NotFoundError } from "./utils/custom.error";
import { errorHandler } from "./middlewares/error.handler";

const app = express();

app.use(json({ limit: "50mb" })); // parse json request body
// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    ["Origin", "Accept", "X-Requested-With", "Content-Type", "csrf"].join(", ")
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// Routing....
app.use("/v1", routes);

app.all("*", async (req, res) => {
  throw new NotFoundError(`Route[${req.method}::${req.url}] not found!`);
});

//Catch all Errors
app.use(errorHandler);

export { app };
