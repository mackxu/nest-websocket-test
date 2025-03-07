import { Controller, Get } from '@nestjs/common';
import { WebuiService } from './webui.service';

@Controller('webui')
export class WebuiController {
  constructor(private readonly webuiService: WebuiService) {}
  @Get()
  async Index() {
    // 代理页面 http://127.0.0.1:7860/
    return fetch('http://127.0.0.1:7860/');
  }
}
