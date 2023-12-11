import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApprovementDto } from './dto/create-approvements.dto';
import {
  UpdateApprovementDto,
  //   UpdatedApprovementDto,
} from './dto/update-approvements.dto';
import { Approvement } from './entities/approvement.entity';
import {
  generatesApprovementRecord,
  getAprovementRecords,
  getAprovementRecord,
  generatesUpdatedpprovementRecord,
} from './mappers/approvements.mappers';
import { checkProperties } from '@/shared/utils/checkProperties';
import { isBoolean } from '@/shared/utils/isBoolean';
import { getApprovementsByQueryParams } from './dto/get-approvements.dto';
import { applyParamsToSearch } from '@/shared/utils/applyParamsToSearch';

@Injectable()
export class ApprovementsService {
  constructor(
    @InjectRepository(Approvement)
    private readonly approvementRepository: Repository<Approvement>,
  ) {}

  async create({
    applicationId,
    rolId,
    documents,
    observations,
    evaluations,
    description,
    endorsement,
    status,
  }: CreateApprovementDto) {
    try {
      if (applicationId && !Number.isInteger(applicationId)) {
        throw new BadRequestException('Debe tener un id de aprobación valido');
      }

      if (rolId && !Number.isInteger(rolId)) {
        throw new BadRequestException('Debe tener un id de rol valido');
      }

      isBoolean(endorsement);

      if (observations.length <= 0)
        throw new BadRequestException('Debe existir al menos una observación');

      const propertiesToSave = checkProperties({
        applicationId,
        rolId,
        documents,
        observations,
        evaluations,
        description,
        endorsement,
        status,
      });

      const approvement =
        await this.approvementRepository.save(propertiesToSave);

      return generatesApprovementRecord(approvement);
    } catch (e) {
      throw e;
    }
  }

  async findAll(queryParams: getApprovementsByQueryParams) {
    try {
      const { pageNumber, pageSize, ...rest } = queryParams;
      const options = {
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        where: {},
      };

      const searchParams = applyParamsToSearch(rest, options);

      const [approvements, total] =
        await this.approvementRepository.findAndCount({ ...searchParams });
      return getAprovementRecords(approvements, total);
    } catch (e) {
      throw e;
    }
  }

  async findOne(
    id: number,
    { rolId, applicationId }: getApprovementsByQueryParams,
  ) {
    try {
      const options = { where: {} };
      const searchParams = applyParamsToSearch(
        { rolId: rolId, applicationId: applicationId, id: id },
        options,
      );

      const approvement = await this.approvementRepository.findOne({
        ...searchParams,
      });

      if (!approvement)
        throw new BadRequestException('No existe la aprobación');

      return getAprovementRecord(approvement);
    } catch (e) {
      throw e;
    }
  }

  async update(
    id: number,
    {
      applicationId,
      documents,
      evaluations,
      observations,
      rolId,
      endorsement,
      status,
      description,
    }: UpdateApprovementDto,
  ) {
    try {
      const approveExists = await this.approvementRepository.findBy({ id: id });
      if (!approveExists)
        throw new NotFoundException(`aprobación con id ${id} no encontrado`);

      const propertiesToUpdate = checkProperties({
        applicationId,
        documents,
        evaluations,
        observations,
        rolId,
        endorsement,
        status,
        description,
      }) as unknown as Approvement;

      if (Object.keys(propertiesToUpdate).length === 0)
        throw new BadRequestException('No hay propiedades para actualizar');
      const approvement = await this.approvementRepository.update(
        id,
        propertiesToUpdate,
      );
      return generatesUpdatedpprovementRecord(approvement);
    } catch (e) {
      throw e;
    }
  }
}
