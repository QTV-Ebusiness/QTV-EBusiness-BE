import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ifExistedValue } from 'libs/utils';

export class CreateArticleBodyDTO {
  @ApiProperty({ example: 1, required: false })
  @ValidateIf(ifExistedValue)
  @IsString()
  photoUrl: string;

  @ApiProperty({ example: 1, required: false })
  @ValidateIf(ifExistedValue)
  @IsString()
  description: string;

  @ApiProperty({ example: 1, required: false })
  @ValidateIf(ifExistedValue)
  @IsString()
  content: string;

  @ApiProperty({ example: '', required: false })
  @ValidateIf(ifExistedValue)
  @IsDateString()
  scheduleAt: string;

  @ApiProperty({ example: 1, required: false })
  @ValidateIf(ifExistedValue)
  @IsString()
  facebookPostId: string;

  @ApiProperty({ example: 1, required: false })
  @ValidateIf(ifExistedValue)
  @IsString()
  instagramPostId: string;

  @ApiProperty({ example: 1, required: false })
  @ValidateIf(ifExistedValue)
  @IsString()
  zaloPostId: string;

  @ApiProperty({ example: 1, required: false })
  @ValidateIf(ifExistedValue)
  @IsBoolean()
  isFacebook: boolean;

  @ApiProperty({ example: 1, required: false })
  @ValidateIf(ifExistedValue)
  @IsBoolean()
  isZalo: boolean;

  @ApiProperty({ example: 1, required: false })
  @ValidateIf(ifExistedValue)
  @IsBoolean()
  isInstagram: boolean;
}

export class UpdateArticleBody extends CreateArticleBodyDTO {
  @ApiProperty({ example: 1, required: false })
  @ValidateIf(ifExistedValue)
  @IsNumber()
  id: number;
}
