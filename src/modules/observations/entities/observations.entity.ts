import { Approvement } from '@/modules/approvements/entities/approvement.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'Observations' })
export class Observation {
  @ApiProperty({
    example: 1,
    description: 'ID de la observación',
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
  @IsNumber()
  @IsNotEmpty()
  @Column({ type: 'integer', nullable: false })
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'ID de la aprobación',
    type: 'number',
    required: true,
  })
  @IsNotEmpty()
  @JoinColumn({ name: 'approvementId' })
  @ManyToOne(() => Approvement, (approvement) => approvement.observations)
  approvement: Approvement;

  @ApiProperty({
    example: 'Observación',
    description: 'Detalle de la observación',
    type: 'string',
    required: true,
  })
  @Column({ type: 'varchar', nullable: false })
  detail: string;

  @ApiProperty({
    example: new Date(),
    type: 'date',
    description: 'Día de creación de la observación',
    required: false,
  })
  @IsDate()
  @Column({ type: 'timestamptz', default: new Date() })
  created_at?: Date;

  @ApiProperty({
    example: new Date(),
    type: 'date',
    description: 'Día de actualización de la observación',
    required: false,
  })
  @IsDate()
  @Column({ type: 'timestamptz', default: new Date() })
  updated_at?: Date;
}
