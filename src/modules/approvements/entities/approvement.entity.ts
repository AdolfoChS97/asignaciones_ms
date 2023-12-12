import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Document } from '@/modules/documents/entities/document.entity';
import { Observation } from '@/modules/observations/entities/observations.entity';
import { Evaluation } from '@/modules/evaluations/entities/evaluation.entity';

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
    example: 1,
    description: 'ID del usuario',
    type: 'number',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Column({ type: 'integer', nullable: false })
  userId: number;

  @ApiProperty({
    description:
      'Objeto que insertara el registro del documento en su tabla pertinente',
    required: true,
    isArray: true,
    type: () => Document,
  })
  @IsNotEmpty()
  @OneToMany(() => Document, (document) => document.approvement, {
    cascade: ['insert', 'update'],
  })
  documents?: Document[];

  @ApiProperty({
    description:
      'Objeto que insertara el registro de la Observación en su tabla pertinente',
    required: true,
    isArray: true,
    type: () => Observation,
  })
  @IsNotEmpty()
  @OneToMany(() => Observation, (observation) => observation.approvement, {
    cascade: ['insert', 'update'],
  })
  observations?: Observation[];

  @ApiProperty({
    description:
      'Objeto que insertara el registro de la Evaluación en su tabla pertinente',
    required: false,
    isArray: true,
    type: () => Evaluation,
  })
  @OneToMany(() => Evaluation, (evaluation) => evaluation.approvement, {
    cascade: ['insert', 'update'],
  })
  evaluations?: Evaluation[];

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
    description:
      'Calificación de la aprobación (Puede usarse para especificar los tipos de aprobación del psicologo)',
    example: 'No procedente',
    required: false,
    type: 'string',
  })
  @Column({ type: 'varchar', nullable: true, default: 'N/A' })
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
