import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'Evaluations'})
export class Evaluation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    result: string;

    @Column()
    approves_id: number;
    
    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;


}
