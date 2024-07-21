import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';
import { ifExistedValue } from 'libs/utils';

export class SendMessageBodyDTO {
  @ApiProperty({ example: '2473910995809050719', required: true })
  @IsString()
  userId: string;

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
  text: string;
}

export class SendBroadcastBodyDTO {
  @ApiProperty({ example: '2d845d1da6584f061649', required: true })
  @IsString()
  attachmentId: string;
}
