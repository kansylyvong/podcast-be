import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppRepository } from './app.repository';
import { UserSchema, podcastSchema } from './app.model';
import { PodcastHttpService } from './app.podcasthttpservice';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Podcast'),
    MongooseModule.forFeature([
      { name: 'PodcastModel', schema: podcastSchema },
      { name: 'UserModel', schema: UserSchema },
    ]),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppRepository, PodcastHttpService],
})
export class AppModule {}
