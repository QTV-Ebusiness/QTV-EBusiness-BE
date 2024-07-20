import { Module } from '@nestjs/common';
import { ZaloModule } from './zalo/zalo.module';

@Module({
  imports: [ZaloModule],
})
export class ExternalModule {}
