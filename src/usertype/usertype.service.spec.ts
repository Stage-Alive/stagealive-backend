import { Test, TestingModule } from '@nestjs/testing';
import { UsertypeService } from './usertype.service';

describe('UsertypeService', () => {
  let provider: UsertypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsertypeService],
    }).compile();

    provider = module.get<UsertypeService>(UsertypeService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
