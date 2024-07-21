import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
