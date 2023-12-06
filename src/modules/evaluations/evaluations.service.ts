import { Injectable } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import {Evaluation} from './entities/evaluation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class EvaluationsService {

 constructor(
  @InjectRepository(Evaluation)
  private readonly evaluationRepository : Repository <Evaluation>
 ){ }

  async create(createEvaluationDto: CreateEvaluationDto) {
    return 'This action adds a new evaluation';
  }

  async findAll() {
    return await this.evaluationRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} evaluation`;
  }

  async update(id: number, updateEvaluationDto: UpdateEvaluationDto) {
    return `This action updates a #${id} evaluation`;
  }

  async remove(id: number) {
    return `This action removes a #${id} evaluation`;
  }
}
