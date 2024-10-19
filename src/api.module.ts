import { Module } from '@nestjs/common';
import { AppController } from './api.controller';
import { AppService } from './api.service';
import { ConfigModule } from '@nestjs/config';
import { NotificationController } from './controllers/notifications/notifications.controller';
import { NotificationService } from './services/notifications/notification.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, NotificationController],
  providers: [AppService, NotificationService],
})
export class AppModule {}
