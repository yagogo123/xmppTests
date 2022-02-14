import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { msgDto } from './dto/app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async getHello(@Body() msg: msgDto) {
    console.log(msg)
    return  await this.appService.getHello(msg);
  }
}
