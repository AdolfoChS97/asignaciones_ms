import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { UpdateParameterDto } from './dto/update-parameter.dto';
import { GetParameterByGroup } from './dto/get-parameter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parameter } from './entities/parameter.entity';
import { PaginationQueryParamsDto } from '@/shared/dtos/pagination.dto';
import {
  generatesParameterRecord,
  getParametersRecords,
  getParameterRecord,
  generatesUpdatedParameterRecord,
} from './mappers/parameter.mapper';
import { checkProperties } from '@/shared/utils/checkProperties';
import { isBoolean } from '@shared/utils/isBoolean';
import { applyParamsToSearch } from '@/shared/utils/applyParamsToSearch';
import { object } from 'joi';

@Injectable()
export class ParametersService {
  constructor(
    @InjectRepository(Parameter)
    private readonly parameterRepository: Repository<Parameter>,
  ) {}

  async create({ name, description, statusParam, type }: CreateParameterDto) {
    try {
      if (!name) {
        throw new BadRequestException('El nombre de ser un string no vacío');
      }

      if (!description) {
        throw new BadRequestException(
          'La descripcion debe ser un string no vacío',
        );
      }

      isBoolean(statusParam);

      if (!type) {
        throw new BadRequestException('El tipo debe ser un string no vacío');
      }

      const param = await this.parameterRepository.save({
        name,
        description,
        statusParam,
        type,
      });
      return generatesParameterRecord(param);
    } catch (e) {
      throw e;
    }
  }

  async findAll(queryParams: GetParameterByGroup) {
    try {
      const { pageNumber, pageSize, ...rest } = queryParams;
      const options = {
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        where: {},
      };

      const searchParams = applyParamsToSearch(rest, options);

      const parameters = await this.parameterRepository
        .createQueryBuilder('parameter')
        .skip(options.skip)
        .take(options.take)
        .where({ ...searchParams.where })
        .getMany();

      return getParameterRecord(parameters);
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: number) {
    try {
      const param = await this.parameterRepository.findOne({
        where: { id: id },
      });
      if (!param)
        throw new NotFoundException(`Parametro con el id ${id} no encontrado`);
      return getParameterRecord(param);
    } catch (e) {
      throw e;
    }
  }

  async update(
    id: number,
    { name, description, statusParam, type }: UpdateParameterDto,
  ) {
    try {
      const parameterExists = await this.parameterRepository.findOne({
        where: { id: id },
      });
      console.log('existe', parameterExists);
      if (!parameterExists) {
        throw new NotFoundException(`Parametro con id ${id} no encontrado`);
      }

      const propertiesToUpdate = checkProperties({
        name,
        description,
        ...(statusParam !== undefined ? { statusParam } : {}),
        type,
      }) as unknown as Parameter;

      if (Object.keys(propertiesToUpdate).length === 0)
        throw new BadRequestException('No properties to update');
      const param = await this.parameterRepository.update(
        id,
        propertiesToUpdate,
      );
      return generatesUpdatedParameterRecord(param);
    } catch (e) {
      throw e;
    }
  }
}
