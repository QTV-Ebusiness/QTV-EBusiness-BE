import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { response } from 'libs/utils';
import { PostParamDTO, ReactionQueryDTO, VerifyTokenParamDTO } from 'types';
import { FacebookService } from './facebook.service';

@Controller('')
@ApiTags('facebook')
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}
  @Get('webhooks')
  getArticle(@Query() query: VerifyTokenParamDTO) {
    console.log(query);
    return response(200, '');
  }

  @Get('facebook/posts')
  getAllPost() {
    return this.facebookService.getAllPost();
  }

  @Get('facebook/post/:postId')
  getPost(@Param() { postId }: PostParamDTO) {
    return this.facebookService.getPost(postId);
  }

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
