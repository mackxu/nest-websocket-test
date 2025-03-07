import { Test, TestingModule } from '@nestjs/testing';
import { WebuiController } from './webui.controller';
import { WebuiService } from './webui.service';

describe('WebuiController', () => {
  let controller: WebuiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebuiController],
      providers: [WebuiService],
    }).compile();

    controller = module.get<WebuiController>(WebuiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
