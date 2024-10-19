import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  private accountService: ClientProxy;

  constructor() {
    this.accountService = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.NOTIFICATION_SERVICE_HOST,
        port: +process.env.NOTIFICATION_SERVICE_PORT,
      },
    });
  }

  getAllNotifications(accountId: string): any {
    return new Promise((resolve) => {
      this.accountService
        .send('get-account-notification', accountId)
        .subscribe((value) => resolve(value));
    });
  }
}
