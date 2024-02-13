import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppRepository } from './app.repository';
import { podcastSchema } from './app.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Podcast'),
    MongooseModule.forFeature([
      { name: 'PodcastModel', schema: podcastSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, AppRepository],
})
export class AppModule {}
