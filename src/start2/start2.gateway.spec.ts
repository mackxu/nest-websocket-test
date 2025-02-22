import { Test, TestingModule } from '@nestjs/testing';
import { Start2Gateway } from './start2.gateway';
import { Start2Service } from './start2.service';

describe('Start2Gateway', () => {
  let gateway: Start2Gateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Start2Gateway, Start2Service],
    }).compile();

    gateway = module.get<Start2Gateway>(Start2Gateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
