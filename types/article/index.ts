import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { transformStringToNumber } from 'libs/utils';

export * from './article.body.dto';
export class ArticleParamDTO {
  @ApiProperty({ example: 1, required: true })
  @Transform(transformStringToNumber, { toClassOnly: true })
  @IsNumber()
  articleId: number;
}
