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
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { existsSync } from 'fs';
import { IgnoreTransform } from 'libs/middleware';
import { response } from 'libs/utils';
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

  @Post('uploads')
  @IgnoreTransform()
  @UseInterceptors(
    FilesInterceptor('files', 6, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files) {
      throw new BadRequestException('File upload failed');
    }
    const url = [];
    files.forEach((file) => {
      url.push(`${process.env.HOST_URL}/uploads/${file.filename}`);
    });
    return response(200, 'SUCCESSFULLY', { url });
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
