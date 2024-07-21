import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { transformStringToNumber } from 'libs/utils';

export * from './send-message.body.dto';
export class ZaloParamDTO {
  @ApiProperty({ example: 1, required: true })
  @Transform(transformStringToNumber, { toClassOnly: true })
  @IsString()
  zaloPostId: string;
}
