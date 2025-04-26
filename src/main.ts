import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Auto validation at the application level
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup(config.get('API_PATH', 'docs/'), app, document);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
