import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Parameter } from '../entities/parameter.entity';

export class UpdateParameterDto extends OmitType(Parameter, [
  'id',
  'created_at',
  'updated_at',
]) {}

export class UpdatedParameterDto {
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
