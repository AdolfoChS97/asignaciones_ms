import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import {
  // UpdatedEvaluationDto,
  UpdateEvaluationDto,
} from './dto/update-evaluation.dto';
import { Evaluation } from './entities/evaluation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  getEvaluationRecords,
  getEvaluationRecord,
  generatesEvaluatioRecord,
  generatesUpdatedEvaluatioRecord,
} from './mappers/evaluation.mapper';
import { checkProperties } from '@/shared/utils/checkProperties';
import { PaginationQueryParamsDto } from '@/shared/dtos/pagination.dto';
import { isBoolean } from '@shared/utils/isBoolean';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
  ) {}

  async create({
    name,
    description,
    result,
    approvement,
    userId,
  }: CreateEvaluationDto) {
    try {
      if (!name) {
        throw new BadRequestException('El nombre debe ser un string no vacío');
      }
      if (!description) {
        throw new BadRequestException(
          'La description debe ser un string no vacío',
        );
      }

      if (!userId && Number.isInteger(userId)) {
        throw new BadRequestException('El usuario debe ser un número');
      }

      isBoolean(result);

      if (!Number.isInteger(approvement)) {
        throw new BadRequestException('El id de aprobación debe ser un número');
      }
      if (!approvement) {
        throw new BadRequestException('Debe tener un id de aprobación');
      }

      const evaluation = await this.evaluationRepository.save({
        name,
        description,
        result,
        approvement,
        userId,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return generatesEvaluatioRecord(evaluation);
    } catch (e) {
      throw e;
    }
  }

  async findAll({ pageNumber, pageSize }: PaginationQueryParamsDto) {
    try {
      const [evaluations, total] = await this.evaluationRepository.findAndCount(
        {
          skip: (pageNumber - 1) * pageSize,
          take: pageSize,
        },
      );
      return getEvaluationRecords(evaluations, total);
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: number) {
    try {
      const evaluation = await this.evaluationRepository.findOne({
        where: { id: id },
      });
      if (!evaluation)
        throw new NotFoundException(`Evaluaion with id ${id} not found`);
      return getEvaluationRecord(evaluation);
    } catch (e) {
      throw e;
    }
  }

  async update(
    id: number,
    { approvement, name, description, result, userId }: UpdateEvaluationDto,
  ) {
    try {
      const evaluExists = await this.evaluationRepository.findBy({ id: id });
      if (!evaluExists)
        throw new NotFoundException(`Evaluation with id ${id} not found`);

      if (!approvement)
        throw new BadRequestException('approvement is required');

      const propertiesToUpdate = checkProperties({
        approvement,
        name,
        description,
        userId,
        ...(result !== undefined ? { result } : {}),
        updated_at: new Date(),
      }) as unknown as Evaluation;

      if (Object.keys(propertiesToUpdate).length === 0)
        throw new BadRequestException('No properties to update');
      const evaluation = await this.evaluationRepository.update(
        id,
        propertiesToUpdate,
      );
      return generatesUpdatedEvaluatioRecord(evaluation);
    } catch (e) {
      throw e;
    }
  }
}
