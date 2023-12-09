import { Test, TestingModule } from '@nestjs/testing';
import { ApprovementsController } from './approvements.controller';
import { ApprovementsService } from './approvements.service';

describe('ApprovementsController', () => {
  let controller: ApprovementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApprovementsController],
      providers: [ApprovementsService],
    }).compile();

    controller = module.get<ApprovementsController>(ApprovementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
