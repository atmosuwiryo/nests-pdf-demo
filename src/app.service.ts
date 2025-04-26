import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'This page is where our SPA will be served. Swagger available at /docs';
  }
}
