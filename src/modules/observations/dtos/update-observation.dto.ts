import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Observation } from '../entities/observations.entity';

export class UpdateObservationDto extends OmitType(Observation, [
  'id',
  'created_at',
  'updated_at',
]) {}

export class UpdatedObservationDto {
  @ApiProperty({
    type: 'number',
    example: { rowsAffected: 1 },
    description: 'Numero de registros afectados',
  })
  data: { rowsAffected: number };

  @ApiProperty({
    type: 'number',
    example: 200,
    description: 'Codigo de la respuesta',
  })
  status: number;
}
