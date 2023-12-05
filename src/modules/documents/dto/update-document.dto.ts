import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Document } from '../entities/document.entity';

export class UpdateDocumentDto extends OmitType(Document, [
  'id',
  'created_at',
  'updated_at',
]) {}

export class UpdatedDocumentDto {
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
