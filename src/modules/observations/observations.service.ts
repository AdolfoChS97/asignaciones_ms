import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observation } from './entities/observations.entity';
import { Repository } from 'typeorm';
import { PaginationQueryParamsDto } from '@/shared/dtos/pagination.dto';
import {
  generatesObservationRecord,
  generatesUpdatedObservationRecord,
  getObservationRecord,
  getObservationsRecords,
} from './mappers/observation.mapper';
import { checkProperties } from '@/shared/utils/checkProperties';
import { CreateObservationDto } from './dtos/create-observation.dto';
import { UpdateObservationDto } from './dtos/update-observation.dto';

@Injectable()
export class ObservationsService {
  constructor(
    @InjectRepository(Observation)
    private observationRepository: Repository<Observation>,
  ) {}

  async findone(id: number) {
    try {
      const observation = await this.observationRepository.findOne({
        where: { id: id },
      });

      if (!observation)
        throw new NotFoundException(`Observation with id ${id} not found`);

      return getObservationRecord(observation);
    } catch (e) {
      throw e;
    }
  }

  async findAll({ pageNumber, pageSize }: PaginationQueryParamsDto) {
    try {
      const [observations, total] =
        await this.observationRepository.findAndCount({
          skip: (pageNumber - 1) * pageSize,
          take: pageSize,
        });
      return getObservationsRecords(observations, total);
    } catch (e) {
      throw e;
    }
  }

  async create({ approves_id, detail }: CreateObservationDto) {
    try {
      if (!approves_id)
        throw new BadRequestException('approves_id is required');

      if (!detail) throw new BadRequestException('detail is required');

      if (!Number.isInteger(approves_id))
        throw new BadRequestException('approves_id must be a number');

      const observation = await this.observationRepository.create({
        approves_id,
        detail,
      });

      return generatesObservationRecord(
        await this.observationRepository.save(observation),
      );
    } catch (e) {
      throw e;
    }
  }

  async update(id: number, { approves_id, detail }: UpdateObservationDto) {
    try {
      if (!detail) throw new BadRequestException('detail is required');

      if (!Number.isInteger(approves_id))
        throw new BadRequestException('approves_id must be a number');

      if (!approves_id)
        throw new BadRequestException('approves_id is required');

      const observationExists = await this.observationRepository.findOne({
        where: { id: id },
      });

      if (!observationExists)
        throw new NotFoundException(`Observation with id ${id} not found`);

      const propertiesToUpdate = checkProperties({
        detail,
        approves_id,
      }) as unknown as Observation;

      if (Object.keys(propertiesToUpdate).length === 0)
        throw new BadRequestException('No properties to update');

      const observation = await this.observationRepository.update(
        id,
        propertiesToUpdate,
      );
      return generatesUpdatedObservationRecord(observation);
    } catch (e) {
      throw e;
    }
  }
}
