import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Document } from '../entities/document.entity';
import { HttpStatus } from '@nestjs/common';

export class CreateDocumentDto extends OmitType(Document, [
  'id',
  'created_at',
  'updated_at',
]) {}


export class createdDocumentDto {
  @ApiProperty({
    type: Document,
    example: Document,
    description: 'Devuelve un documento',
  })
  data: Document;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.CREATED,
    description: 'Codigo de la respuesta',
  })
  status: HttpStatus.CREATED;
}
