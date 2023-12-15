import { HttpStatus } from '@nestjs/common';
import { CreatedParameterDto } from '../dto/create-parameter.dto';
import { getParametersDto, getParameterDto } from '../dto/get-parameter.dto';
import { UpdatedParameterDto } from '../dto/update-parameter.dto';

export function generatesParameterRecord(parameter): CreatedParameterDto {
  return { data: parameter, status: HttpStatus.CREATED };
}

export function getParametersRecords(parameters, total): getParametersDto {
  return { data: parameters, meta: total, status: HttpStatus.OK };
}

export function getParameterRecord(parameter): getParameterDto {
  return { data: parameter, status: HttpStatus.OK };
}

export function generatesUpdatedParameterRecord(
  parameter,
): UpdatedParameterDto {
  const { affected } = parameter;
  return { data: { rowsAffected: affected }, status: HttpStatus.OK };
}
