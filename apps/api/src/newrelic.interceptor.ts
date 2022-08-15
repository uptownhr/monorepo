import newrelic from 'newrelic';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class NewrelicInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return newrelic.startWebTransaction(context.getHandler().name, function() {
      const transaction = newrelic.getTransaction();
      // const now = Date.now();
      return next.handle().pipe(
        tap(() => {
          return transaction.end();
        }),
      );
    });
  }
}
