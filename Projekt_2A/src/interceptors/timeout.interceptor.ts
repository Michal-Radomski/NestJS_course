import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  async intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    return next.handle().pipe(
      timeout(5000),

      catchError((error) => {
        if (error instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        } else {
          return throwError(error);
        }
      }),
    );
  }
}
