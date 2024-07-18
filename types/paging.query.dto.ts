import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, ValidateIf } from 'class-validator';
import { ifExistedValue, transformStringToNumber } from 'libs/utils';

export class PagingQueryDTO {
  @ApiProperty({ example: null, required: false })
  @ValidateIf(ifExistedValue)
  @Transform(transformStringToNumber)
  @IsNumber()
  page: number;

  @ApiProperty({ example: null, required: false })
  @ValidateIf(ifExistedValue)
  @Transform(transformStringToNumber)
  @IsNumber()
  limit: number;
}
