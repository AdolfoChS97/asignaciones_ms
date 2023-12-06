import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateObservationDto } from './dtos/create-observation';
import { InjectRepository } from '@nestjs/typeorm';
import { Observation } from './entities/observations.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ObservationsService {
  constructor(
    @InjectRepository(Observation)
    private observationRepository: Repository<Observation>,
  ) {}

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

      return await this.observationRepository.save(observation);
    } catch (e) {
      throw e;
    }
  }
}
