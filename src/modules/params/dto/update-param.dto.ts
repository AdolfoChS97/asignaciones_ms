import { PartialType } from '@nestjs/mapped-types';
import { CreateParamDto } from './create-param.dto';

export class UpdateParamDto extends PartialType(CreateParamDto) {}
