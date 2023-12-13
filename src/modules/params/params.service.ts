import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateParamDto } from './dto/create-param.dto';
import { UpdateParamDto } from './dto/update-param.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Param } from './entities/param.entity'  

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
    return
    } catch (e) {
      throw e;
    }
    
 
  }

  findAll() {
    return `This action returns all params`;
  }

  findOne(id: number) {
    return `This action returns a #${id} param`;
  }

  update(id: number, updateParamDto: UpdateParamDto) {
    return `This action updates a #${id} param`;
  }

  remove(id: number) {
    return `This action removes a #${id} param`;
  }
}
