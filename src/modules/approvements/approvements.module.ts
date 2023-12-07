import { Module } from '@nestjs/common';
import { ApprovementsService } from './approvements.service';
import { ApprovementsController } from './approvements.controller';
import { Approvement } from './entities/approvement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Approvement])],
  controllers: [ApprovementsController],
  providers: [ApprovementsService],
})
export class ApprovementsModule {}
