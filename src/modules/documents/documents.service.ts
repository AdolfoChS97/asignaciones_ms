import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import {
  getDocumentsRecords,
  getDocumentRecord,
  generatesDocumentRecord,
  generatesUpdatedDocumentRecord,
} from './mappers/document.mapper';
import { isBase64 } from '@shared/utils/isBase64';
import { checkProperties } from '@/shared/utils/checkProperties';
import { PaginationQueryParamsDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async create({ name, base64, approvement }: CreateDocumentDto) {
    try {
      if (base64) isBase64(base64);

      if (!Number.isInteger(approvement))
        throw new BadRequestException('approvement must be a number');

      if (!approvement)
        throw new BadRequestException('approvement is required');

      const doc = await this.documentRepository.save({
        name,
        base64,
        approvement,
      });
      return generatesDocumentRecord(doc);
    } catch (e) {
      throw e;
    }
  }

  async findAll({ pageNumber, pageSize }: PaginationQueryParamsDto) {
    try {
      const [docs, total] = await this.documentRepository.findAndCount({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });
      return getDocumentsRecords(docs, total);
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: number) {
    try {
      const doc = await this.documentRepository.findOne({ where: { id: id } });
      if (!doc) throw new NotFoundException(`Document with id ${id} not found`);
      return getDocumentRecord(doc);
    } catch (e) {
      throw e;
    }
  }

  async update(id: number, { approvement, name, base64 }: UpdateDocumentDto) {
    try {
      if (base64) isBase64(base64);

      if (approvement && !Number.isInteger(approvement))
        throw new BadRequestException('approvement must be a number');

      const docExists = await this.documentRepository.findBy({ id: id });
      if (!docExists)
        throw new NotFoundException(`Document with id ${id} not found`);

      const propertiesToUpdate = checkProperties({
        approvement,
        name,
        base64,
      }) as unknown as Document;

      if (Object.keys(propertiesToUpdate).length === 0)
        throw new BadRequestException('No properties to update');
      const doc = await this.documentRepository.update(id, propertiesToUpdate);
      return generatesUpdatedDocumentRecord(doc);
    } catch (e) {
      throw e;
    }
  }
}
