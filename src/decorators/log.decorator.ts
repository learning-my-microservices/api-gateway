import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_HOST],
        queue: 'logger-queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    this.client.emit('logger-create', {
      request: JSON.stringify({
        method: request.method,
        url: request.originalUrl,
        queryParams: request.query,
        headers: request.headers,
        body: request.body,
        ip: request.ip,
      }),
      response: JSON.stringify({
        statusCode: response.statusCode,
        body: response.body,
      }),
      serviceName: 'api-gateway',
    });

    return next.handle();
  }
}
