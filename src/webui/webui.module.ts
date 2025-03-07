import { Module } from '@nestjs/common';
import { WebuiService } from './webui.service';
import { WebuiController } from './webui.controller';

@Module({
  controllers: [WebuiController],
  providers: [WebuiService],
})
export class WebuiModule {}
