import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Approvement } from '../entities/approvement.entity';

export class UpdateApprovementDto extends OmitType(Approvement, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

export class UpdatedApprovementDto {
  @ApiProperty({
    type: 'number',
    example: { rowsAffected: 1 },
    description: 'Numero de registro afectado',
  })
  data: { rowsAffected: number };

  @ApiProperty({
    type: 'number',
    example: 200,
    description: 'Codigo de la respuesta',
  })
  status: number;
}
