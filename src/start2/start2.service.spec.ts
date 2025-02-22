import { Test, TestingModule } from '@nestjs/testing';
import { Start2Service } from './start2.service';

describe('Start2Service', () => {
  let service: Start2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Start2Service],
    }).compile();

    service = module.get<Start2Service>(Start2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
