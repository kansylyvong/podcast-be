import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PodcastDocument, Podcast } from './app.model';

@Injectable()
export class AppRepository {
  constructor(
    @InjectModel('PodcastModel') private podcastModel: Model<PodcastDocument>,
  ) {}

  async getPodcasts() {
    return this.podcastModel.find().exec();
  }

  async addPodcast(podcast: Podcast) {
    const newPodcast = new this.podcastModel(podcast);
    return newPodcast.save();
  }
}
