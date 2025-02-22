import { Module } from '@nestjs/common';
import { Start2Service } from './start2.service';
import { Start2Gateway } from './start2.gateway';

@Module({
  providers: [Start2Gateway, Start2Service],
})
export class Start2Module {}
