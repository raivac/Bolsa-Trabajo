import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constants';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.json({ limit: '50mb' }));
  const configService = app.get(ConfigService);

  const port = configService.get<number>(SERVER_PORT)
  await app.listen(port);
  console.log('listen on port' + await app.getUrl())
}
bootstrap();