import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { Evaluation } from '../entities/evaluation.entity';

export class getEvaluationsDto {
  @ApiProperty({
    type: Evaluation,
    isArray: true,
    description: 'Devuelve un array de evaluaciones',
    example: Evaluation,
  })
  data: Evaluation[];

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Cuenta cuantas evaluaciones fueron devueltas en la consulta',
  })
  meta: number;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.OK,
    description: 'Codigo de la respuesta',
  })
  status: HttpStatus.OK;
}

export class getEvaluationDto {
  @ApiProperty({
    type: Evaluation,
    description: 'Devuelve un documento',
    example: Evaluation,
  })
  data: Evaluation;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.OK,
    description: 'Codigo de la respuesta',
  })
  status: HttpStatus.OK;
}
