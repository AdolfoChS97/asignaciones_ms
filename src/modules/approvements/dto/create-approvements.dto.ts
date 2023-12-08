import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Approvement } from '../entities/approvement.entity';
import { HttpStatus } from '@nestjs/common';
import { Document } from '@/modules/documents/entities/document.entity';

export class CreateApprovementDto extends OmitType(Approvement, [
  'id',
  'createdAt',
  'updatedAt',
]) {
  @ApiProperty({
    type: Document,
  })
  document: Document;
}

export class createApprovement {
  @ApiProperty({
    type: Approvement,
    example: Approvement,
    description: 'Devuelve una Aprobacion',
  })
  data: Approvement;

  @ApiProperty({
    type: 'number',
    example: HttpStatus.CREATED,
    description: 'Codigo de respuesta',
  })
  status: HttpStatus.CREATED;
}
