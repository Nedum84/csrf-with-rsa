import httpStatus from "http-status";

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract errorCode: string;
  public errors: any[]; //for request validation error {Joi validation}

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export class BadRequestError extends CustomError {
  constructor(
    public message: string,
    public errorCode = "BAD_REQUEST_ERROR",
    public statusCode: number = httpStatus.BAD_REQUEST,
    stack?: any
  ) {
    super(message);
    this.errorCode = errorCode;
    this.stack = stack ?? this.stack;

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class ForbiddenError extends CustomError {
  statusCode = httpStatus.FORBIDDEN;

  constructor(
    public message = "You don't have enough permission to access this resource",
    public errorCode = "ACCESS_DENIED"
  ) {
    super(message);

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class NotFoundError extends CustomError {
  statusCode = httpStatus.NOT_FOUND;

  constructor(public message: string = "Not found", public errorCode = "NOT_FOUND_ERROR") {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class UnauthorizedError extends CustomError {
  statusCode = httpStatus.UNAUTHORIZED;

  constructor(
    public message = "Unauthorized for this action",
    public errorCode = "UNAUTHORIZED_ERROR"
  ) {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
