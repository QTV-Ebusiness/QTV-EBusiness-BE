import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, ValidateIf } from 'class-validator';
import { ifExistedValue, transformStringToNumber } from 'libs/utils';

export class VerifyTokenParamDTO {
  @ApiProperty({ example: null, required: false })
  @ValidateIf(ifExistedValue)
  @IsString()
  hub_mode: string;

  @ApiProperty({ example: null, required: false })
  @ValidateIf(ifExistedValue)
  @Transform(transformStringToNumber)
  @IsNumber()
  hub_challenge: number;

  @ApiProperty({ example: null, required: false })
  @ValidateIf(ifExistedValue)
  @IsString()
  hub_verify_token: string;
}

export class PostParamDTO {
  @ApiProperty({ example: null, required: false })
  @ValidateIf(ifExistedValue)
  @IsString()
  postId: string;
}

export class ReactionQueryDTO {
  @ApiProperty({
    example: null,
    required: false,
    enum: ['LIKE', 'HAHA', 'LOVE', 'CARE', 'ANGRY', 'SAD', 'WOW'],
  })
  @ValidateIf(ifExistedValue)
  @IsString()
  type: string;
}
