import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ZaloService } from './zalo.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'libs/middleware';
import { SendBroadcastBodyDTO, SendMessageBodyDTO, ZaloParamDTO } from 'types';

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

  @Get('articles')
  getArticles() {
    return this.zaloService.getArticles();
  }

  @Post('message')
  sendMessage(@Body() body: SendMessageBodyDTO) {
    return this.zaloService.sendMessage(body);
  }

  @Post('broadcast')
  sendBroadcast(@Body() body: SendBroadcastBodyDTO) {
    return this.zaloService.sendBroadcast(body);
  }
}
