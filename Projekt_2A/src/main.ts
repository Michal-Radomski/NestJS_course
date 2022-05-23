import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ImATeapotExceptionFilter } from './filters/global-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

// import * as Helmet from 'helmet';
// console.log('helmet:', helmet);
// console.log('Helmet:', Helmet);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  (app as NestExpressApplication).use(helmet());
  app.enableShutdownHooks();
  app.useGlobalFilters(new ImATeapotExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
