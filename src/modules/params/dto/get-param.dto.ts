import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { Param } from '../entities/param.entity';

export class getParamsDto {
    @ApiProperty({
        type: Param,
        isArray: true,
        description: 'Devuelve un array de parametros',
        example: Param,
    })
    data: Param [];

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

export class getParamDto {
    @ApiProperty({
      type: Param,
      description: 'Devuelve un Param',
      example: Param,
    })
    data: Param;
  
    @ApiProperty({
      type: 'number',
      example: HttpStatus.OK,
      description: 'Codigo de la respuesta',
    })
    status: HttpStatus.OK;
  }