import { Injectable, HttpStatus, NestInterceptor, ExecutionContext,CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'


@Injectable()
export class HttpStatusSuccess implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler) :Observable<any> {
        context.switchToHttp().getResponse().status(HttpStatus.OK);
        return next.handle().pipe(map(data => {
            return data;
        }))
    }
}