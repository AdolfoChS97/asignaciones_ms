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
  getApprovementRecords,
  getApprovementRecord,
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
    userId,
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

      if (userId && !Number.isInteger(userId)) {
        throw new BadRequestException('Debe tener un id de usuario valido');
      }

      isBoolean(endorsement);

      const propertiesToSave = checkProperties({
        applicationId,
        userId,
        rolId,
        documents,
        observations,
        evaluations,
        description,
        endorsement,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
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
      
      const nested = Boolean(rest?.nested) || false;
      if (!nested) {
        const approvements = await this.approvementRepository
          .createQueryBuilder('approvement')
          .select([
            'approvement.id AS id',
            'approvement.status AS status',
            'approvement.rolId AS rolId',
            'approvement.applicationId AS applicationId',
          ])
          .skip(options.skip)
          .take(options.take)
          .where({ ...searchParams.where })
          .getRawMany();

        return getApprovementRecords(approvements);
      }


      const approvements = await this.approvementRepository
        .createQueryBuilder('approvement')
        .leftJoinAndSelect(
          'approvement.documents',
          'documents',
          'documents.approvementId = approvement.id',
        )
        .leftJoinAndSelect(
          'approvement.evaluations',
          'evaluations',
          'evaluations.approvementId = approvement.id',
        )
        .leftJoinAndSelect(
          'approvement.observations',
          'observations',
          'observations.approvementId = approvement.id',
        )
        .skip(options.skip)
        .take(options.take)
        .where({ ...searchParams.where })
        .getMany();

      return getApprovementRecords(approvements);
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: number) {
    try {
      const options = { where: {} };
      const searchParams = applyParamsToSearch({ id: id }, options);

      const approvement = await this.approvementRepository
        .createQueryBuilder('approvement')
        .leftJoinAndSelect(
          'approvement.documents',
          'documents',
          'documents.approvementId = approvement.id',
        )
        .leftJoinAndSelect(
          'approvement.evaluations',
          'evaluations',
          'evaluations.approvementId = approvement.id',
        )
        .leftJoinAndSelect(
          'approvement.observations',
          'observations',
          'observations.approvementId = approvement.id',
        )
        .where(searchParams.where)
        .getOne();

      if (!approvement) throw new NotFoundException('No existe la aprobación');

      return getApprovementRecord(approvement);
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
        updatedAt: new Date(),
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
