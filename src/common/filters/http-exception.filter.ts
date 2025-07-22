import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '@/common/interfaces/api-response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse() as any;
    
    const errorResponse: ApiResponse = {
      success: false,
      error: typeof exceptionResponse === 'string' ? exceptionResponse : exceptionResponse.message,
      message: this.getErrorMessage(status),
      meta: {
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
      },
    };

    // Handle validation errors specifically
    if (status === HttpStatus.BAD_REQUEST && Array.isArray(exceptionResponse.message)) {
      errorResponse.error = exceptionResponse.message;
      errorResponse.message = 'Validation failed';
    }

    response.status(status).json(errorResponse);
  }

  private getErrorMessage(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'Bad Request';
      case HttpStatus.UNAUTHORIZED:
        return 'Unauthorized';
      case HttpStatus.FORBIDDEN:
        return 'Forbidden';
      case HttpStatus.NOT_FOUND:
        return 'Not Found';
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return 'Internal Server Error';
      default:
        return 'Something went wrong';
    }
  }
}