import { HttpStatus } from "@nestjs/common";
import { CreatedParamDto } from '../dto/create-param.dto'

export function generatesParamRecord(param): CreatedParamDto{
    return { data : param,  status: HttpStatus.CREATED}
}