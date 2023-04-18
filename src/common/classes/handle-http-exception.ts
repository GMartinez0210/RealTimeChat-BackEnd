import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch()
export class HandleHttpException implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    console.log('exception | catch | HandleHttpException');
    console.log(exception);

    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const timestamp = new Date().toISOString();
    const path = request.url;

    const isHttpException = exception instanceof HttpException;

    if (!isHttpException) {
      const { name, message } = exception;

      const status = 500;
      const statusCode = status;

      const error = {
        path,
        name,
        message,
        timestamp,
        statusCode,
      };

      response.status(status).json({ error });
      return;
    }

    const status = exception.getStatus();
    const statusCode = status;

    const { name, message } = exception;

    const error = {
      path,
      name,
      message,
      timestamp,
      statusCode,
    };

    response.status(status).json({ error });
  }
}
