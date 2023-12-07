import { Controller } from '@nestjs/common';
import { ApprovementsService } from './approvements.service';

@Controller('approvements')
export class ApprovementsController {
  constructor(private readonly approvementsService: ApprovementsService) {}
}
