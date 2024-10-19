import { Body, Controller, Get } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { IRegisterDto, RegisterDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('accounts')
@Controller('accounts')
export class AppController {
  private accountService: ClientProxy;

  constructor() {
    this.accountService = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.ACCOUNT_SERVICE_HOST,
        port: +process.env.ACCOUNT_SERVICE_PORT,
      },
    });
  }

  @Get()
  register(@Body() register: IRegisterDto): any {
    try {
      const result = RegisterDto.parse(register);
      return new Promise((resolve, reject) => {
        this.accountService.send('account-create', result).subscribe({
          next: (result) => resolve(result),
          error: (e) => reject(e),
        });
      });
    } catch (error) {
      throw error;
    }
  }
}
