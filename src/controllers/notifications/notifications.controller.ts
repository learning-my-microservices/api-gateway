import { Controller, Get, Param } from '@nestjs/common';

import { NotificationService } from '../../services/notifications/notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private service: NotificationService) {}

  @Get(':accountId')
  register(@Param() accountId: string): any {
    try {
      return this.service.getAllNotifications(accountId);
    } catch (error) {
      throw error;
    }
  }
}
