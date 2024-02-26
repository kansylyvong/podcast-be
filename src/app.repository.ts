import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PodcastDocument, Podcast, User } from './app.model';

@Injectable()
export class AppRepository {
  constructor(
    @InjectModel('PodcastModel') private podcastModel: Model<PodcastDocument>,
    @InjectModel('UserModel') private userModel: Model<User>,
  ) {}

  async getPodcasts() {
    return await this.podcastModel.find().exec();
  }

  async addPodcast(podcast: Podcast) {
    const newPodcast = new this.podcastModel(podcast);
    return await newPodcast.save();
  }
  async addPodcasts(podcasts: Podcast[]) {
    return await this.podcastModel.insertMany(podcasts);
  }
  async updatePodcast(podcast: Podcast) {
    return await this.podcastModel.updateOne({ title: podcast.title }, podcast);
  }
  async createUser(
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    created: Date,
    lastUpdate: Date,
  ) {
    const user = new this.userModel({
      username,
      password,
      email,
      firstName,
      lastName,
      created,
      lastUpdate,
    });
    return await user.save();
  }
  async findUser(username: string) {
    return this.userModel.findOne({ username }).exec();
  }
}
