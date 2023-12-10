import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Approvement } from '../entities/approvement.entity';
import { HttpStatus } from '@nestjs/common';
import { PaginationQueryParamsDto } from '@/shared/dtos/pagination.dto';

export class getAprovementsDto {
  @ApiProperty({
    type: Approvement,
    isArray: true,
    description: 'Devuelve un array de aprovaciones',
    example: Approvement,
  })
  data: Approvement[];

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Cuenta cuantas aprobaciones fueron devueltas en la consulta',
  })
  meta: number;

  @ApiProperty({
    type: 'number',
    example: HttpStatus,
    description: 'Codigo de la respuesta',
  })
  status: HttpStatus.OK;
}

export class getAprovementDto {
  @ApiProperty({
    type: Approvement,
    description: 'Devuelve una aprobación',
    example: Approvement,
  })
  data: Approvement;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.OK,
    description: 'Codigo de la respuesta',
  })
  status: HttpStatus.OK;
}

export class getApprovementsByQueryParams extends PartialType(
  PaginationQueryParamsDto,
) {
  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Id del rol que recibie la postulación',
  })
  rolId?: number;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Id de la postulación',
  })
  applicationId?: number;
}
