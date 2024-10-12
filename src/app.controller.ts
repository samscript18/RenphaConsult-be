import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/guard/auth.decorator';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
