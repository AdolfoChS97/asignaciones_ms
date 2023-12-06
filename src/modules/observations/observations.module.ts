import { Module } from '@nestjs/common';
import { ObservationsService } from './observations.service';
import { ObservationsController } from './observations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observation } from './entities/observations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Observation])],
  controllers: [ObservationsController],
  providers: [ObservationsService],
})
export class ObservationsModule {}
