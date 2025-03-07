import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StartModule } from './start/start.module';
import { Start2Module } from './start2/start2.module';
import { WebuiModule } from './webui/webui.module';

@Module({
  imports: [StartModule, Start2Module, WebuiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
