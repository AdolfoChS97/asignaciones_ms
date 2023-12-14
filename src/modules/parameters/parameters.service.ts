import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { UpdateParameterDto } from './dto/update-parameter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parameter } from './entities/parameter.entity'  
import { PaginationQueryParamsDto } from '@/shared/dtos/pagination.dto';
import  {
  generatesParameterRecord,
  getParametersRecords,
  getParameterRecord,
  generatesUpdatedParameterRecord
} from  './mappers/parameter.mapper'
import { checkProperties } from '@/shared/utils/checkProperties';

@Injectable()
export class ParametersService {
  constructor(
    @InjectRepository(Parameter)
    private readonly parameterRepository : Repository<Parameter>
  ){}


  async create({
    name,
    description,
    status,
    type
  }: CreateParameterDto) {

    try {
      if(!name){
        throw new BadRequestException('El nombre de ser un string no vacío')
      }
  
      if(!description){
        throw new BadRequestException('La descripcion debe ser un string no vacío')
      }
      if(!status){
        throw new BadRequestException('El estatus debe ser un string no vacío')
      }
      if(!type){
        throw new BadRequestException('El tipo debe ser un string no vacío')
      }
      
      const param = await this.parameterRepository.save({
        name,
      description,
      status,
      type
    });
    return generatesParameterRecord (param)
    } catch (e) {
      throw e;
    }
  }

  async findAll({ pageNumber, pageSize }: PaginationQueryParamsDto) {
    try {
      const [params, total] = await this.parameterRepository.findAndCount({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });
      return getParametersRecords(params, total);
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: number) {
  try { 
      const param = await this.parameterRepository.findOne({ where : {id:id}});
      if(!param) throw new NotFoundException(`Parametro con el id ${id} no encontrado`);
      return getParameterRecord(param);
  } catch (e) {
    throw e
  }
  }

  async update(id: number, {name, description, status, type}: UpdateParameterDto) {
    try {
      const parameterExists = await this.parameterRepository.findOne({where : {id: id}});
      console.log('existe' ,parameterExists)
      if(!parameterExists){
        throw new NotFoundException(`Parametro con id ${id} no encontrado`)
      }

      if (!status || typeof status !== 'string') {
        throw new BadRequestException('status is required and should be a string');
      }

      if (!type || typeof type !== 'string') {
        throw new BadRequestException('type is required and should be a string');
      }

      const propertiesToUpdate = checkProperties({
        name,
        description,
        status,
        type
      }) as unknown as Parameter;

      if(Object.keys(propertiesToUpdate).length === 0)
        throw new BadRequestException('No properties to update');
        const param =await this.parameterRepository.update(
          id,
          propertiesToUpdate
        );
        return generatesUpdatedParameterRecord(param);
    } catch (e) {
      throw e;
    }
  }

}
