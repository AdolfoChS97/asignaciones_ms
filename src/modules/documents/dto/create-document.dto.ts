import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Document } from '../entities/document.entity';
import { HttpStatus } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

export class CrearPuntosDeCuentaDto extends OmitType(Document, [
  'id',
  'base64',
  'created_at',
  'updated_at',
]) {
  @ApiProperty({
    type: 'string',
    example: 'plantilla',
    description: 'Nombre de la plantilla del punto de cuenta',
  })
  @IsNotEmpty()
  fileName: string;

  @ApiProperty({
    type: 'object',
    example: { mensaje: 'Hola mundo' },
    description: 'Propiedades del punto de cuenta',
  })
  @IsNotEmpty()
  data: [key: string, value: string];
}

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
