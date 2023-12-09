import { ApiProperty } from '@nestjs/swagger';
import { Approvement } from '../entities/approvement.entity';
import { HttpStatus } from '@nestjs/common';

export class getAprovementsDto {
  @ApiProperty({
    type: Approvement,
    isArray: true,
    description: 'Devuelve un array de aprovaciones',
    example: Approvement,
  })
  data: Approvement[];

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Cuenta cuantas aprobaciones fueron devueltas en la consulta',
  })
  meta: number;

  @ApiProperty({
    type: 'number',
    example: HttpStatus,
    description: 'Codigo de la respuesta',
  })
  status: HttpStatus.OK;
}

export class getAprovementDto {
  @ApiProperty({
    type: Approvement,
    description: 'Devuelve una aprobación',
    example: Approvement,
  })
  data: Approvement;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.OK,
    description: 'Codigo de la respuesta',
  })
  status: HttpStatus.OK;
}
