import { OmitType } from '@nestjs/swagger';
import { Observation } from '../entities/observations.entity';

export class CreateObservationDto extends OmitType(Observation, [
  'id',
  'created_at',
  'updated_at',
]) {}
