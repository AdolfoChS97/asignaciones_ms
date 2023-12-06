import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Observation } from '../entities/observations.entity';
import { HttpStatus } from '@nestjs/common';

export class CreateObservationDto extends OmitType(Observation, [
  'id',
  'created_at',
  'updated_at',
]) {}

export class createdObservationDto {
  @ApiProperty({
    type: Observation,
    example: Observation,
    description: 'Devuelve una observación',
  })
  data: Observation;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.CREATED,
    description: 'Codigo de la respuesta',
  })
  status: HttpStatus.CREATED;
}
