type Props<T> =
  | {
      data: T;
      error?: ErrorResponse;
    }
  | {
      data?: T;
      error: ErrorResponse;
    };

export class ServerResponse<T> {
  data?: T;
  error?: ErrorResponse;

  constructor(props: Props<T>) {
    this.data = props.data;
    this.error = props.error;
  }
}

class ErrorResponse {
  constructor(
    public readonly message?: string,
    public readonly errors?: {
      message: string;
      field: string;
    }[],
    public readonly code?: string
  ) {}
}
