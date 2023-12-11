import { Approvement } from '@/modules/approvements/entities/approvement.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Evaluations' })
export class Evaluation {
  @ApiProperty({
    example: 1,
    description: 'Id de la evaluacion',
    type: 'number',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID del usuario',
    type: 'number',
    required: true,
  })
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'ID de la aprobacion',
    type: 'number',
  })
  @JoinColumn({ name: 'approvementId' })
  @ManyToOne(() => Approvement, (approvement) => approvement.evaluations)
  approvement: Approvement;

  @ApiProperty({
    example: 'Evaluacion',
    description: 'Nombre de la evaluacion',
    type: 'string',
  })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  name: string;

  @ApiProperty({
    example: 'Descripcion',
    description: 'Descripcion de la evaluacion',
    type: 'string',
  })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  description: string;

  @ApiProperty({
    example: 'true',
    description: 'Estado del resultado',
    type: 'boolean',
  })
  @Column({ type: 'bool', nullable: false })
  @IsNotEmpty()
  result: boolean;

  @ApiProperty({
    example: new Date(),
    type: 'date',
    description: 'Día de la creación de la evaluacion',
    required: false,
  })
  @Column({ type: 'timestamptz', default: new Date() })
  created_at: Date;

  @ApiProperty({
    example: new Date(),
    type: 'date',
    description: 'Día de actualización del documento',
    required: false,
  })
  @Column({ type: 'timestamptz', default: new Date() })
  updated_at: Date;
}
