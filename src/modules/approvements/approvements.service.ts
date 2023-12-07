import { 
    Injectable,
    BadRequestException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateApprovementDto} from './dto/create-approvements.dto';
import { Approvement } from './entities/approvement.entity'
import { isBoolean } from '@shared/utils/isBoolean';
import { generatesApprovementRecord } from './mappers/approvements.mappers';

@Injectable()
export class ApprovementsService {
constructor(@InjectRepository(Approvement)
    private readonly  approvementRepository : Repository <Approvement>
){}

async create({applicationId , documentId, rolId, endorsement, status, description } : CreateApprovementDto){
    try{
        if(!Number.isInteger(applicationId)){
            throw new BadRequestException('Debe tener un id de aprobación valido') 
        }
        if(!Number.isInteger(documentId)){
            throw new BadRequestException('Debe tener un id de documento valido') 
        }
        if(!Number.isInteger(rolId)){
            throw new BadRequestException('Debe tener un id de rol valido')
        }

        isBoolean(endorsement) 

        if(!status){
            throw new BadRequestException('El estatus debe ser un string no vacío')
        }

        if(!description){
            throw new BadRequestException('La description debe ser un string no vacío')
        }

        const approvement = await this.approvementRepository.save({
            applicationId,
            documentId,
            rolId,
            endorsement,
            status,
            description
        });
        return generatesApprovementRecord(approvement)

    }catch(e){
        throw e
    }

}


}
