import { Response } from "express";

interface SuccessResponse<T> {
  success: true;
  data: T;
  status: number;
}

interface ErrorResponse<T> {
  success: false;
  error: {
    message: T;
  };
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

// Success response with data
export const sendSuccessResponse = <T>(
  res: Response,
  data: T,
  status: number
): Response<SuccessResponse<T>> => {
  return res.status(status).json({ success: true, data });
};

// Success response without data (e.g., for delete operations)
export const sendSuccessNoDataResponse = (
  res: Response,
  message = "Operation successful",
  status: number
): Response<SuccessResponse<null>> => {
  return res.status(status).json({ success: true, message });
};

// Error response
export const sendErrorResponse = <T>(
  res: Response,
  message: T,
  status: number
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Not Found response
export const sendNotFoundResponse = <T>(
  res: Response,
  message: T,
  status: number
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Validation Error response
export const sendValidationError = <T>(
  res: Response,
  message: T,
  errors: string[],
  status: number
): Response<ErrorResponse<T>> => {
  return res.status(status).json({
    success: false,
    error: {
      message: message,
      errors: errors,
    },
  });
};

// Unauthorized response
export const sendUnauthorizedResponse = <T>(
  res: Response,
  message = "Unauthorized",
  status: number
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Forbidden response
export const sendForbiddenResponse = <T>(
  res: Response,
  message = "Forbidden",
  status: number
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};

// Bad Request response
export const sendBadRequestResponse = <T>(
  res: Response,
  message: T,
  status: number
): Response<ErrorResponse<T>> => {
  return res.status(status).json({ success: false, error: { message } });
};
