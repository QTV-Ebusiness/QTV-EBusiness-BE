import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpAccountId } from 'libs/utils';
import { ArticleService } from './article.service';
import { ArticleParamDTO, CreateArticleBodyDTO } from 'types/article';
import { JwtAccessTokenGuard } from 'libs/middleware';
import { PagingQueryDTO } from 'types';

@Controller('')
@ApiBearerAuth()
@UseGuards(JwtAccessTokenGuard)
@ApiTags('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post('article')
  createArticle(
    @Body() body: CreateArticleBodyDTO,
    @HttpAccountId() accountId,
  ) {
    return this.articleService.createArticle(body, accountId);
  }

  @Put('article/:articleId')
  updateArticle(
    @Param() { articleId }: ArticleParamDTO,
    @Body() body: CreateArticleBodyDTO,
    @HttpAccountId() accountId,
  ) {
    return this.articleService.updateArticle(articleId, body, accountId);
  }

  @Get('article/:articleId')
  getArticle(@Param() { articleId }: ArticleParamDTO) {
    return this.articleService.getArticle(articleId);
  }

  @Get('articles')
  getArticles(@Query() payload: PagingQueryDTO) {
    return this.articleService.getArticles(payload);
  }
}
