import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Param } from '../entities/param.entity'

export class UpdateParamDto extends OmitType(Param, [
    'id',
    'created_at',
    'updated_at',
]) {}

export class UpdatedParamDto {
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