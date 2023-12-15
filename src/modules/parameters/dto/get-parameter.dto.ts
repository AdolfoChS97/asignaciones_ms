import { ApiProperty, PartialType } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { Parameter } from '../entities/parameter.entity';
import { PaginationQueryParamsDto } from '@/shared/dtos/pagination.dto';

export class getParametersDto {
  @ApiProperty({
    type: Parameter,
    isArray: true,
    description: 'Devuelve un array de parametros',
    example: Parameter,
  })
  data: Parameter[];


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


export class GetParameterByGroup extends PartialType(
  PaginationQueryParamsDto
){

  @ApiProperty({
    type: 'string',
    example: 'name',
    description : 'Nombre del parametro'
  })
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'type',
    description : 'Tipo del parametro'
  })
  type: string;

  @ApiProperty({
    type: 'bool',
    example: 'true',
    description : 'Estatus del parametro',
  })
  statusParam: boolean;
}