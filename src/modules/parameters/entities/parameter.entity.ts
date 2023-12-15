import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Parameters' })
export class Parameter {
  @ApiProperty({
    example: 1,
    description: 'Id del parametro',
    type: 'number',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Parametro',
    description: 'Nombre del parametro',
    type: 'string',
  })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  name: string;

  @ApiProperty({
    example: 'Descripción',
    description: 'Descripción del parametro',
    type: 'string',
  })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  description: string;

  @ApiProperty({
    example: 'Type',
    description: 'tipo del parametro',
    type: 'string',
  })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  type: string;

  @ApiProperty({
    example: 'status',
    description: 'Estatus  del parametro',
    type: 'string',
  })
  @Column({ type: 'varchar', nullable: false, length: 255 })
  status: string;

  @ApiProperty({
    example: new Date(),
    type: 'date',
    description: 'Día de la creación del parametro',
    required: false,
  })
  @Column({ type: 'timestamptz', default: new Date() })
  created_at: Date;

  @ApiProperty({
    example: new Date(),
    type: 'date',
    description: 'Día de actualización del parametro',
    required: false,
  })
  @Column({ type: 'timestamptz', default: new Date() })
  updated_at: Date;
}
