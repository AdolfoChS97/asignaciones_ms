import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Evaluation } from '../entities/evaluation.entity';
import { HttpStatus } from '@nestjs/common';

export class CreateEvaluationDto extends OmitType(Evaluation, [
  'id',
  'created_at',
  'updated_at',
]) {}

export class createdEvaluationDto {
  @ApiProperty({
    type: Evaluation,
    example: Evaluation,
    description: 'Devuelve una evaluacion',
  })
  data: Evaluation;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.CREATED,
    description: 'Codigo de la respuesta',
  })
  status: HttpStatus.CREATED;
}
