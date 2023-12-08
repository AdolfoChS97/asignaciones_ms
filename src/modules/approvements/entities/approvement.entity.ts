import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Document } from '@/modules/documents/entities/document.entity';

@Entity({ name: 'Approvements' })
export class Approvement {
  @ApiProperty({ description: 'ID de la aprobación', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Parametro que referencia al ID de postulación',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Column({ type: 'integer', nullable: false })
  applicationId: number;

  @ApiProperty({
    description: 'Parametro que referencia al ID de documento',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  // @Column({ nullable: false, default: 0 })
  @OneToMany(() => Document, (document) => document.approvement, {
    cascade: ['insert', 'update'],
  })
  documents: Document[];

  @ApiProperty({
    description:
      'Parametro que referencia al ID del rol que realiza la aprobación',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Column({ type: 'integer', nullable: false, default: 0 })
  rolId: number;

  @ApiProperty({
    description: 'Resultado de la aprobación (true/false) acorde al usuario',
    example: true,
    required: false,
  })
  @IsBoolean()
  @Column({ type: 'boolean', nullable: true, default: false })
  endorsement?: boolean;

  @ApiProperty({
    description: 'Enum que indica el estado de la aprobación',
    example: 1,
    required: false,
  })
  @Column({ type: 'integer', nullable: true, default: 0 })
  status?: string;

  @ApiProperty({
    description: 'Descripción de la aprobación',
    example: 'Texto',
    required: false,
  })
  @Column({ type: 'varchar', length: 225, nullable: true, default: '' })
  description?: string;

  @ApiProperty({
    description: 'Fecha de creación de la aprobación',
    example: '2021-01-01',
    required: false,
    default: new Date(),
  })
  @Column({ type: 'timestamptz', default: new Date() })
  createdAt?: Date;

  @ApiProperty({
    description: 'Fecha de actualización de la aprobación',
    example: '2021-01-01',
    required: false,
    default: new Date(),
  })
  @Column({ type: 'timestamptz', default: new Date() })
  updatedAt: Date;
}
