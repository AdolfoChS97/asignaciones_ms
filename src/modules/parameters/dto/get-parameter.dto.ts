import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { Parameter } from '../entities/parameter.entity';

export class getParametersDto {
    @ApiProperty({
        type: Parameter,
        isArray: true,
        description: 'Devuelve un array de parametros',
        example: Parameter,
    })
    data: Parameter [];

    @ApiProperty({
        type: 'number',
        example: 1,
        description: 'Cuenta cuantos parametros fueron devueltos en la consulta',
      })
      meta: number;

    @ApiProperty({
    type: 'number',
    example: HttpStatus.OK,
    description: 'Codigo de la respuesta',
    })
    status: HttpStatus.OK;
}

export class getParameterDto {
    @ApiProperty({
      type: Parameter,
      description: 'Devuelve un Param',
      example: Parameter,
    })
    data: Parameter;
  
    @ApiProperty({
      type: 'number',
      example: HttpStatus.OK,
      description: 'Codigo de la respuesta',
    })
    status: HttpStatus.OK;
  }