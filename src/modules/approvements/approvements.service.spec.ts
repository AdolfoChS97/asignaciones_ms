import { Test, TestingModule } from '@nestjs/testing';
import { ApprovementsService } from './approvements.service';

describe('ApprovementsService', () => {
  let service: ApprovementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApprovementsService],
    }).compile();

    service = module.get<ApprovementsService>(ApprovementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
