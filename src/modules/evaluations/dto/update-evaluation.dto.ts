import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Evaluation } from '../entities/evaluation.entity';

export class UpdateEvaluationDto extends OmitType(Evaluation, [
  'id',
  'created_at',
  'updated_at',
]) {}

export class UpdatedEvaluationDto {
  @ApiProperty({
    type: 'number',
    example: { rowsAffected: 1 },
    description: 'Numero de registro afectados',
  })
  data: { rowsAffected: number };

  @ApiProperty({
    type: 'number',
    example: 200,
    description: 'Codigo de la respuesta',
  })
  status: number;
}
