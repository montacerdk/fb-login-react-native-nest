import { QueryFailedError } from "typeorm";
import { Response } from "express";
import {
  UnprocessableEntityException,
  ConflictException,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Catch,
} from "@nestjs/common";

import { DBErrorCodes } from "@common/data";

@Catch(QueryFailedError)
export class QueryExceptionsFilters implements ExceptionFilter {
  public catch(exception: QueryFailedError, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    let status = HttpStatus.UNPROCESSABLE_ENTITY;
    console.error("QueryFailedError ===> ", exception);
    let error: any = new UnprocessableEntityException();
    const ex = exception as any;
    if (ex.code === DBErrorCodes.Conflict) {
      status = HttpStatus.CONFLICT;
      error = new ConflictException();
    }
    const payload = {
      message: error.getResponse().message,
      statusCode: status,
    };
    if (process.env.NODE_ENV !== "production") {
      Object.assign(payload, {
        parameters: ex.parameters,
        constraint: ex.constraint,
        details: ex.detail,
        query: ex.query,
      });
    }
    response.status(status).json(payload);
  }
}
