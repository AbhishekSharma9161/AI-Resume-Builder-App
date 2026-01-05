import { Response } from 'express';

export class ResponseUtil {
  static success(res: Response, data: any, message?: string, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  static error(res: Response, message: string, statusCode = 500, details?: any) {
    return res.status(statusCode).json({
      success: false,
      error: message,
      details
    });
  }

  static unauthorized(res: Response, message = 'Unauthorized') {
    return this.error(res, message, 401);
  }

  static notFound(res: Response, message = 'Resource not found') {
    return this.error(res, message, 404);
  }

  static badRequest(res: Response, message = 'Bad request', details?: any) {
    return this.error(res, message, 400, details);
  }
}