import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { Document } from '../entities/document.entity';

export class getDocumentsDto {
  @ApiProperty({
    type: Document,
    isArray: true,
    description: 'Devuelve un array de documentos',
    example: Document,
  })
  data: Document[];

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Cuenta cuantos documentos fueron devueltos en la consulta',
  })
  meta: number;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.OK,
    description: 'Codigo de la respuesta',
  })
  status: HttpStatus.OK;
}

export class getDocumentDto {
  @ApiProperty({
    type: Document,
    description: 'Devuelve un documento',
    example: Document,
  })
  data: Document;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.OK,
    description: 'Codigo de la respuesta',
  })
  status: HttpStatus.OK;
}
