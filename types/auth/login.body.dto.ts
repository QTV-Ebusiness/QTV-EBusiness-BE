import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class LoginBodyDTO {
  @ApiProperty({ example: '0987654321', required: true })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password@!123', required: true })
  @IsString()
  password: string;
}
