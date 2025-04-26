import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('PDF Demo')
  .setDescription('NestJS create dynamic pdf')
  .setVersion(`Version ${process.env.VERSION} - ${process.env.NODE_ENV}`)
  // .addBearerAuth(undefined, 'access-token')
  // .addBearerAuth(undefined, 'refresh-token')
  .setExternalDoc('Postman Collection', '/docs-json')
  .build();
