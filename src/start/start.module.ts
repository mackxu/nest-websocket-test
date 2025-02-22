import { Module } from '@nestjs/common';
import { StartService } from './start.service';
import { StartGateway } from './start.gateway';

@Module({
  providers: [StartGateway, StartService],
})
export class StartModule {}
