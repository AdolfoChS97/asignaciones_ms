import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Observation } from '../entities/observations.entity';

export class getObservationsDto {
  @ApiProperty({
    type: Observation,
    isArray: true,
    description: 'Devuelve un array de observaciones',
    example: Observation,
  })
  data: Observation[];

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Cuenta cuantas observaciones fueron devueltos en la consulta',
  })
  meta: number;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.OK,
    description: 'Codigo de la respuesta',
  })
  status: HttpStatus.OK;
}

export class getObservationDto {
  @ApiProperty({
    type: Observation,
    description: 'Devuelve una observacion',
    example: Observation,
  })
  data: Observation;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.OK,
    description: 'Codigo de la respuesta',
  })
  status: HttpStatus.OK;
}
