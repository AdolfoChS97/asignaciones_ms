import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Approvement } from '@modules/approvements/entities/approvement.entity';

@Entity({ name: 'Documents' })
export class Document {
  @ApiProperty({ example: 1, description: 'ID del documento', type: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID de la aprobación',
    type: 'number',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Column({ type: 'integer', nullable: false })
  @ManyToOne(() => Approvement, (approvement) => approvement.documentId)
  approvesId: number;

  @ApiProperty({
    example: 'Documento',
    description: 'Nombre del documento',
    type: 'string',
    required: false,
  })
  @Column({ type: 'varchar', nullable: true, length: 255 })
  name?: string;

  @ApiProperty({
    example: `base64`,
    description: 'Hash del documento en base64',
    type: 'text',
    required: true,
  })
  @IsBase64()
  @IsNotEmpty()
  @Column({ type: 'text', nullable: false })
  base64: string;

  @ApiProperty({
    example: new Date(),
    type: 'date',
    description: 'Día de creación del documento',
    required: false,
  })
  @IsDate()
  @Column({ type: 'timestamptz', default: new Date() })
  created_at?: Date;

  @ApiProperty({
    example: new Date(),
    type: 'date',
    description: 'Día de actualización del documento',
    required: false,
  })
  @IsDate()
  @Column({ type: 'timestamptz', default: new Date() })
  updated_at?: Date;
}
