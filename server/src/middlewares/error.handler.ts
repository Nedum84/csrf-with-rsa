import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { CustomError } from "../utils/custom.error";

/**
 * Handles all the throwable errors and returns the standard response
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = httpStatus.BAD_REQUEST;

  console.error(err);

  // close any opened connections during the invoc

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({
      status: err.statusCode,
      code: err.errorCode,
      message: err.message,
      errors: err.errors ?? null,
      stack: err.stack,
    });
  }

  res.status(status).send({
    status,
    message: err.message ?? "Something went wrong.",
    stack: err.stack ?? "",
    code: "BAD_REQUEST_ERROR",
    errors: null,
  });
};
