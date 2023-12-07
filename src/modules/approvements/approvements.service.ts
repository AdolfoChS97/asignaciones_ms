import { 
    Injectable,
    BadRequestException,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateApprovementDto} from './dto/create-approvements.dto';
import { UpdateApprovementDto , UpdatedApprovementDto } from './dto/update-approvements.dto';
import { Approvement } from './entities/approvement.entity'
import { isBoolean } from '@shared/utils/isBoolean';
import { generatesApprovementRecord } from './mappers/approvements.mappers';
import { checkProperties } from '@/shared/utils/checkProperties';

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

        // isBoolean(endorsement) 

        // if(Number.isInteger(status)){
        //     throw new BadRequestException('El estatus debe ser un numero')
        // }


        const approvement = await this.approvementRepository.save({
            applicationId,
            documentId,
            rolId,
        });
        return generatesApprovementRecord(approvement)

    }catch(e){
        throw e
    }

}

async update(id : number , {applicationId , documentId , rolId ,endorsement, status ,description}: UpdateApprovementDto){
    try {     
        const approveExists = await this.approvementRepository.findBy({id : id})
        if(!approveExists)
        throw new NotFoundException(`aprobación con id ${id} no encontrado`);
        
        const propertiesToUpdate = checkProperties({
            applicationId,
            documentId,
            rolId,
            endorsement,
            status,
            description
        }) as unknown as Approvement;
         
        if(Object.keys(propertiesToUpdate).length === 0)
        throw new BadRequestException('No hay propiedades para actualizar');
        const doc = await this.approvementRepository.update(id , propertiesToUpdate );
        return generatesApprovementRecord(doc);

    } catch (e) {
        throw e;   
    }
}



}
