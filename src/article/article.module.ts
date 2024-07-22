import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { FacebookService } from 'src/external/facebook/facebook.service';
import { ZaloService } from 'src/external/zalo/zalo.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, FacebookService, ZaloService],
})
export class ArticleModule {}
