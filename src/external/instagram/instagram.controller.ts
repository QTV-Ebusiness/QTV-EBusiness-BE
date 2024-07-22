import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from 'libs/middleware';
import { CreatePostBodyDTO } from 'types/instagram';

@Controller('instagram')
@ApiBearerAuth()
@UseGuards(JwtAccessTokenGuard)
@ApiTags('instagram')
@Controller()
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}
  @Post('')
  createPost(@Body() body: CreatePostBodyDTO) {
    return this.instagramService.createPost(body);
  }
}
