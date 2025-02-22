import { Test, TestingModule } from '@nestjs/testing';
import { StartGateway } from './start.gateway';
import { StartService } from './start.service';

describe('StartGateway', () => {
  let gateway: StartGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StartGateway, StartService],
    }).compile();

    gateway = module.get<StartGateway>(StartGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
