import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ZaloService } from './zalo.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'libs/middleware';
import { SendMessageBodyDTO, ZaloParamDTO } from 'types';

@Controller('zalo')
@ApiBearerAuth()
@UseGuards(JwtAccessTokenGuard)
@ApiTags('zalo')
@Controller()
export class ZaloController {
  constructor(private readonly zaloService: ZaloService) {}
  @Get('/:zaloPostId')
  getArticle(@Param() { zaloPostId }: ZaloParamDTO) {
    return this.zaloService.getArticle(zaloPostId);
  }

  @Get('/articles/list')
  getArticles() {
    return this.zaloService.getArticles();
  }

  @Post('message')
  sendMessage(@Body() body: SendMessageBodyDTO) {
    return this.zaloService.sendMessage(body);
  }

  @Get('/access-token/generate')
  getAccessToken() {
    return this.zaloService.getAccessToken();
  }
}
