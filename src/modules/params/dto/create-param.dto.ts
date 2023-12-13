import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Param }  from '../entities/param.entity'
import { HttpStatus } from '@nestjs/common';


export class CreateParamDto  extends OmitType(Param , [
    'id',
    'created_at',
    'updated_at',
]){}

export class CreatedParamDto{
    @ApiProperty({
        type : Param,
        example : Param,
        description : 'Devuelve un parametro',
    })
    data: Param;

    @ApiProperty({
        type: 'number',
        example:HttpStatus.CREATED,
        description : 'Codigo de la respuesta'
    })
    status: HttpStatus.CREATED
}
