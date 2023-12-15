import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Parameter } from '../entities/parameter.entity';
import { HttpStatus } from '@nestjs/common';

export class CreateParameterDto extends OmitType(Parameter, [
  'id',
  'created_at',
  'updated_at',
]) {}

export class CreatedParameterDto {
  @ApiProperty({
    type: Parameter,
    example: Parameter,
    description: 'Devuelve un parametro',
  })
  data: Parameter;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.CREATED,
    description: 'Codigo de la respuesta',
  })
  status: HttpStatus.CREATED;
}
