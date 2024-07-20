import { Module } from '@nestjs/common';
import { ZaloController } from './zalo.controller';
import { ZaloService } from './zalo.service';

@Module({
  providers: [ZaloService],
  controllers: [ZaloController],
})
export class ZaloModule {}
