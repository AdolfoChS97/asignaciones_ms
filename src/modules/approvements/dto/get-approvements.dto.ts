import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Approvement } from '../entities/approvement.entity';
import { HttpStatus } from '@nestjs/common';
import { PaginationQueryParamsDto } from '@/shared/dtos/pagination.dto';

export class GetApprovementRecords {
  @ApiProperty({
    type: Approvement,
    isArray: true,
    description: 'Devuelve un array de aprobaciones',
    example: Approvement,
  })
  data: Approvement[] | any;

  @ApiProperty({
    type: 'number',
    example: HttpStatus,
    description: 'Codigo de la respuesta',
  })
  status: HttpStatus.OK;
}

export class GetApprovementRecord {
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

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Id del usuario que realizo la postulación',
  })
  userId?: number;

  @ApiProperty({
    type: 'string',
    example: 'approved',
    description: 'Estado de la aprobación',
  })
  status?: string;

  @ApiProperty({
    type: 'boolean',
    example: 'false',
    description:
      'Parametro que indica sí la respuesta contiene datos anidados o no',
  })
  nested?: boolean;
}
