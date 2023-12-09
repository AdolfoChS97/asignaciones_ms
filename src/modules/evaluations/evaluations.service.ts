import {
  BadRequestException, 
  Injectable, 
  NotFoundException 
} from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdatedEvaluationDto, UpdateEvaluationDto } from './dto/update-evaluation.dto';
import {Evaluation} from './entities/evaluation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  getEvaluationRecords,
  getEvaluationRecord,
  generatesEvaluatioRecord,
  generatesUpdatedEvaluatioRecord
} from './mappers/evaluation.mapper'
import { checkProperties } from '@/shared/utils/checkProperties';
import { PaginationQueryParamsDto } from '@/shared/dtos/pagination.dto';
import { isBoolean } from '@shared/utils/isBoolean';



@Injectable()
export class EvaluationsService {

 constructor(
  @InjectRepository(Evaluation)
  private readonly evaluationRepository : Repository <Evaluation>
 ){ }

  async create({name , description , result , approves_id }: CreateEvaluationDto) {
    try {
      if(!name){
        throw new BadRequestException('El nombre debe ser un string no vacío')
      }
      if(!description){
        throw new BadRequestException('La description debe ser un string no vacío')
      }
      isBoolean(result) 
       
      if (!Number.isInteger(approves_id)) {
        throw new BadRequestException('El id de aprobación debe ser un número');
      }    
      if(!approves_id){
        throw new BadRequestException('Debe tener un id de aprobación')
       }
      
        
      const evaluation = await this.evaluationRepository.save({
        name,
        description,
        result,
        approves_id
      });
      return generatesEvaluatioRecord(evaluation)
      

    } catch (e) {
      throw e;
    }

  }

  async findAll({ pageNumber, pageSize }: PaginationQueryParamsDto) {
    try {
      const [docs, total] = await this.evaluationRepository.findAndCount({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });
      return getEvaluationRecords(docs, total);
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: number) {
    try {
      const doc = await this.evaluationRepository.findOne({ where: { id: id } });
      if (!doc) throw new NotFoundException(`Evaluaion with id ${id} not found`);
      return getEvaluationRecord(doc);
    } catch (e) {
      throw e;
    }
  }

  async update(id: number, { approves_id, name, description,  result }: UpdateEvaluationDto) {
   try{
    
    const evaluExists = await this.evaluationRepository.findBy({id : id}) 
    if(!evaluExists)
      throw new NotFoundException(`Evaluation with id ${id} not found`);

    if (!approves_id)
      throw new BadRequestException('approves_id is required');

      isBoolean(result) 

      const propertiesToUpdate = checkProperties({
        approves_id,
        name,
        description,
        result
      })as unknown as Evaluation;

      if(Object.keys(propertiesToUpdate).length === 0)
        throw new BadRequestException('No properties to update');
        const doc = await this.evaluationRepository.update(id, propertiesToUpdate);
        return generatesUpdatedEvaluatioRecord(doc);

   }catch(e){
    throw e;
   }
  }

}
