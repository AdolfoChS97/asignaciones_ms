import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateParamDto } from './dto/create-param.dto';
import { UpdateParamDto } from './dto/update-param.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Param } from './entities/param.entity'  
import { PaginationQueryParamsDto } from '@/shared/dtos/pagination.dto';
import  {
  generatesParamRecord,
  getParamsRecords,
  getParamRecord,
  generatesUpdatedParamRecord
} from  './mappers/param.mapper'
import { NotFoundError } from 'rxjs';
import { checkProperties } from '@/shared/utils/checkProperties';

@Injectable()
export class ParamsService {
  constructor(
    @InjectRepository(Param)
    private readonly paramRepository : Repository<Param>
  ){}


  async create({
    name,
    description
  }: CreateParamDto) {

    try {
      if(!name){
        throw new BadRequestException('El nombre de ser un string no vacío')
      }
  
      if(!description){
        throw new BadRequestException('La descripcion debe ser un string no vacío')
      }
      
      const param = await this.paramRepository.save({
        name,
      description
    });
    return generatesParamRecord (param)
    } catch (e) {
      throw e;
    }
  }

  async findAll({ pageNumber, pageSize }: PaginationQueryParamsDto) {
    try {
      const [params, total] = await this.paramRepository.findAndCount({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });
      return getParamsRecords(params, total);
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: number) {
  try { 
      const param = await this.paramRepository.findOne({ where : {id:id}});
      if(!param) throw new NotFoundException(`Parametro con el id ${id} no encontrado`);
      return getParamRecord(param);
  } catch (e) {
    throw e
  }
  }

  async update(id: number, {name, description}: UpdateParamDto) {
    try {
      const paramExists = await this.paramRepository.findOne({where : {id: id}});
      console.log('existe' ,paramExists)
      if(!paramExists){
        throw new NotFoundException(`Parametro con id ${id} no encontrado`)
      }
      const propertiesToUpdate = checkProperties({
        name,
        description
      }) as unknown as Param;

      if(Object.keys(propertiesToUpdate).length === 0)
        throw new BadRequestException('No properties to update');
        const param =await this.paramRepository.update(
          id,
          propertiesToUpdate
        );
        return generatesUpdatedParamRecord(param);
    } catch (e) {
      throw e;
    }
  }

}
