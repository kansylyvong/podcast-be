import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { Podcast } from './app.model';
import { PodcastHttpService } from './app.podcasthttpservice';
import * as bcrypt from 'bcrypt';
import { XMLParser } from 'fast-xml-parser';

@Injectable()
export class AppService {
  constructor(
    private appRepository: AppRepository,
    private podcastHttpService: PodcastHttpService,
  ) {}
  async getPodcasts(): Promise<Podcast[]> {
    const podcasts = await this.appRepository.getPodcasts();
    return podcasts.map((podcast) => ({
      title: podcast.title,
      epImageLink: podcast.epImageLink,
      description: podcast.description,
      link: podcast.link,
      pubDate: podcast.pubDate,
      enclosure: podcast.enclosure,
      audioType: podcast.audioType,
      starRating: podcast.starRating,
      host: podcast.host,
      level: podcast.level,
      played: podcast.played,
    }));
  }

  addPodcast(podcast: Podcast): string {
    this.appRepository.addPodcast(podcast);
    return 'Podcast added successfully';
  }
  async updatePodcast(podcast: Podcast): Promise<string> {
    this.appRepository.updatePodcast(podcast);
    return 'Podcast updated successfully';
  }
  async refreshPodcasts() {
    const response = await this.podcastHttpService
      .getLatestPodcasts()
      .toPromise();
    const options = {
      ignoreAttributes: false,
      unpairedTags: ['enclosure'],
      arrayMode: /^item$/, // "item" tag will be parsed into an array
    };
    const parser = new XMLParser(options);
    const podcasts = parser.parse(response.data);
    const podcastModels = [];
    podcasts.rss.channel.item.forEach((podcast) => {
      const podcastModel: Podcast = {
        title: podcast.title,
        epImageLink: podcast.epImageLink,
        description: podcast.description,
        link: podcast.link,
        pubDate: podcast.pubDate,
        enclosure: podcast.enclosure['@_url'],
        audioType: podcast.enclosure['@_type'],
        starRating: podcast.starRating,
        host: podcast.description.slice(0, podcast.description.indexOf('.')),
        level: podcast.title.slice(0, podcast.title.search(':')),
        played: false,
      };
      podcastModels.push(podcastModel);
    });
    await this.appRepository.addPodcasts(podcastModels);
  }

  async login(username: string, password: string): Promise<any> {
    return await this.appRepository.findUser(username).then(async (user) => {
      if (user && (await bcrypt.compare(password, user.password))) {
        return user;
      } else {
        return false;
      }
    });
  }
  async createUser(
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    this.appRepository.createUser(
      username,
      hashedPassword,
      email,
      firstName,
      lastName,
      new Date(),
      new Date(),
    );
  }
}
