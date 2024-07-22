import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Get,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { existsSync } from 'fs';
import { IgnoreTransform } from 'libs/middleware';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('')
export class ImageUploaderController {
  @Post('upload')
  @IgnoreTransform()
  @UseInterceptors(
    FileInterceptor('upload', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    if (!file) {
      throw new BadRequestException('File upload failed');
    }
    return res.status(200).json({
      uploaded: true,
      url: `${process.env.HOST_URL}/uploads/${file.filename}`,
    });
  }

  @IgnoreTransform()
  @Get('uploads/:imageName')
  seeUploadedFile(@Param('imageName') image, @Res() res: Response) {
    const imagePath = join(__dirname, '../../../uploads', image);
    if (existsSync(imagePath)) {
      return res.status(200).sendFile(imagePath);
    } else {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Image not found' });
    }
  }
}
