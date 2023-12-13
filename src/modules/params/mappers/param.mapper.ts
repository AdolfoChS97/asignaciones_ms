import { HttpStatus } from "@nestjs/common";
import { CreatedParamDto } from '../dto/create-param.dto'
import { getParamsDto }  from '../dto/get-param.dto'


export function generatesParamRecord(param): CreatedParamDto{
    return { data : param,  status: HttpStatus.CREATED}
}

export function getParamsRecords (params , total) : getParamsDto {
    return { data: params, meta: total, status: HttpStatus.OK };
}