import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CrearPuntosDeCuentaDto,
  CreateDocumentDto,
} from './dto/create-document.dto';
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
import { FileService } from '@/shared/services/file.service';
import * as Mustache from 'mustache';
import * as Pdf from 'html-pdf';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    private readonly fileService: FileService,
  ) {}

  async create({ name, base64, approvement }: CreateDocumentDto) {
    try {
      // if (fileName) {
      //   const file = await this.fileService.getFile(fileName);
      //   // base64 = file.url;
      //   console.log(file);
      // }

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

  async crearPuntosDeCuenta({
    name,
    fileName,
    approvement,
    userId,
    data,
  }: CrearPuntosDeCuentaDto) {
    try {
      const file = (await this.fileService.getFile(fileName)).toString();
      const parsedFile = Mustache.render(file, data);
      return new Promise((resolve, reject) => {
        Pdf?.create(parsedFile).toFile(async (err, file) => {
          if (err) reject(new InternalServerErrorException(err.message));
          const doc = await this.documentRepository.save({
            name,
            base64: Buffer.from(file.filename).toString('base64'),
            approvement,
            userId,
          });
          resolve(generatesDocumentRecord(doc));
        });
      });
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
