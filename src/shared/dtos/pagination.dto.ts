import { IsNumber, IsPositive } from 'class-validator';

export class PaginationQueryParamsDto {
  @IsNumber()
  @IsPositive()
  pageNumber: number;

  @IsNumber()
  @IsPositive()
  pageSize: number;
}
