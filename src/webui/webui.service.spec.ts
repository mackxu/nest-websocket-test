import { Test, TestingModule } from '@nestjs/testing';
import { WebuiService } from './webui.service';

describe('WebuiService', () => {
  let service: WebuiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebuiService],
    }).compile();

    service = module.get<WebuiService>(WebuiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
