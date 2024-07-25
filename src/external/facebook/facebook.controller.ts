import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { response } from 'libs/utils';
import { PostParamDTO, ReactionQueryDTO, VerifyTokenParamDTO } from 'types';
import { FacebookService } from './facebook.service';
import { JwtAccessTokenGuard } from 'libs/middleware';

@Controller('')
@ApiTags('facebook')
@ApiBearerAuth()
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}
  @Get('webhooks')
  getArticle(@Query() query: VerifyTokenParamDTO) {
    console.log(query);
    return response(200, '');
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get('facebook/posts')
  getAllPost() {
    return this.facebookService.getAllPost();
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get('facebook/post/:postId')
  getPost(@Param() { postId }: PostParamDTO) {
    return this.facebookService.getPost(postId);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get('facebook/comments/:postId')
  getComments(@Param() { postId }: PostParamDTO) {
    return this.facebookService.getComments(postId);
  }

  @Get('facebook/reactions/:postId')
  getReactions(
    @Param() { postId }: PostParamDTO,
    @Query() query: ReactionQueryDTO,
  ) {
    return this.facebookService.getReactions({ postId, ...query });
  }
}
