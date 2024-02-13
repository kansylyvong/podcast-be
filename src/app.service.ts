import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { Podcast } from './app.model';

@Injectable()
export class AppService {
  constructor(private appRepository: AppRepository) {}
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
    }));
  }

  addPodcast(podcast: Podcast): string {
    this.appRepository.addPodcast(podcast);
    return 'Podcast added successfully';
  }
}
