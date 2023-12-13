import { HttpStatus } from "@nestjs/common";
import { CreatedParamDto } from '../dto/create-param.dto'
import { getParamsDto , getParamDto }  from '../dto/get-param.dto'
import { UpdatedParamDto } from '../dto/update-param.dto'


export function generatesParamRecord(param): CreatedParamDto{
    return { data : param,  status: HttpStatus.CREATED}
}

export function getParamsRecords (params , total) : getParamsDto {
    return { data: params, meta: total, status: HttpStatus.OK };
}

export function getParamRecord(param) : getParamDto {
    return { data: param , status : HttpStatus.OK};
}

export function generatesUpdatedParamRecord(param) : UpdatedParamDto {
    const { affected } = param;
    return {data: {rowsAffected: affected} , status: HttpStatus.OK}
}