import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { FacebookService } from 'src/external/facebook/facebook.service';
import { ZaloService } from 'src/external/zalo/zalo.service';
import { InstagramService } from 'src/external/instagram/instagram.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, FacebookService, ZaloService, InstagramService],
})
export class ArticleModule {}
