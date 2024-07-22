import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RequestContextModule } from 'nestjs-request-context';
import { HttpGuard } from 'libs/middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './config/jwt-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Account, Profile } from 'libs/entities';
import { ExternalModule } from './external/external.module';
import { ArticleModule } from './article/article.module';
import { ImageUploaderModule } from './image-uploader/image-uploader.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    RequestContextModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forFeature([Profile, Account]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/**/**/**.entity{.ts,.js}'],
      synchronize: false,
    }),

    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    AuthModule,
    ExternalModule,
    ArticleModule,
    ImageUploaderModule,
    MulterModule.register({
      dest: '../uploads',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: HttpGuard,
    },
  ],
})
export class AppModule {}
