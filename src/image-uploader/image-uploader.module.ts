import { Module } from '@nestjs/common';
import { ImageUploaderController } from './image-uploader.controller';
import { ImageUploaderService } from './image-uploader.service';

@Module({
  controllers: [ImageUploaderController],
  providers: [ImageUploaderService],
})
export class ImageUploaderModule {}
