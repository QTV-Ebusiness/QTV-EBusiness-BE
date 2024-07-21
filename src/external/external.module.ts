import { Module } from '@nestjs/common';
import { ZaloModule } from './zalo/zalo.module';
import { FacebookModule } from './facebook/facebook.module';
import { InstagramModule } from './instagram/instagram.module';

@Module({
  imports: [ZaloModule, FacebookModule, InstagramModule],
})
export class ExternalModule {}
