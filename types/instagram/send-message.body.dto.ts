import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';
import { ifExistedValue } from 'libs/utils';

export class CreatePostBodyDTO {
  @ApiProperty({
    example: 'https://stc-developers.zdn.vn/images/bg_1.jpg',
    required: false,
  })
  @ValidateIf(ifExistedValue)
  @IsString()
  photoUrl: string;

  @ApiProperty({ example: 'Hello World!', required: false })
  @ValidateIf(ifExistedValue)
  @IsString()
  content: string;
}
