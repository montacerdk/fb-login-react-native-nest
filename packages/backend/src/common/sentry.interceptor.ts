import * as Sentry from "@sentry/minimal";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import {
  ExecutionContext,
  NestInterceptor,
  Injectable,
  CallHandler,
} from "@nestjs/common";

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(null, (exception) => {
        Sentry.captureException(exception);
      })
    );
  }
}
