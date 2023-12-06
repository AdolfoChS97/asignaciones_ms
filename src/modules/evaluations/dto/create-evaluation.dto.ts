import { OmitType } from '@nestjs/swagger'
import {Evaluation} from '../entities/evaluation.entity'



export class CreateEvaluationDto extends OmitType(Evaluation ,[
    'id',
    'created_at',
    'updated_at',
])  {}
