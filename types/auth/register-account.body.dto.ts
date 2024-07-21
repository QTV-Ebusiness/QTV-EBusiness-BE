import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';
import { ifExistedValue } from 'libs/utils';

export class RegisterAccountBodyDTO {
  @ApiProperty({ example: 'Nguyen  Van A', required: true })
  @IsString()
  fullName: string;

  @ApiProperty({ example: '0123456789', required: true })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'password@!123', required: true })
  @IsString()
  password: string;
}
