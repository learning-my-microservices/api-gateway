import { NestFactory } from '@nestjs/core';
import { AppModule } from './api.module';
import { LogInterceptor } from './decorators/log.decorator';
import { INestApplication, Logger } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import { join } from 'path';

async function startApiGateway() {
  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalInterceptors(new LogInterceptor());
    initSwagger(app);
    await app.listen(process.env.PORT ?? 3000, () => {
      Logger.log('API GATEWAY STARTED', 'api-gateway');
    });
  } catch (error) {
    throw error;
  }
}

startApiGateway();

function initSwagger(app: INestApplication) {
  const swaggerDocument = YAML.load(join(__dirname, '..', 'swagger.yaml'));
  SwaggerModule.setup('api', app, swaggerDocument);
}
