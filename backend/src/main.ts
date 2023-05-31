import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constants';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableCors({
    origin: 'http://r-jobs.es',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  });
  app.use(bodyParser.json({ limit: '50mb' }));
  const configService = app.get(ConfigService);

  const port = configService.get<number>(SERVER_PORT)
  await app.listen(port);
  
}
bootstrap();