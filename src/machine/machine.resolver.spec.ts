import { Test, TestingModule } from '@nestjs/testing';
import { MachineResolver } from './machine.resolver';

describe('MachineResolver', () => {
  let resolver: MachineResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MachineResolver],
    }).compile();

    resolver = module.get<MachineResolver>(MachineResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
