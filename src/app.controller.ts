import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Podcast, PodcastRequestBody } from './app.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/podcasts')
  async getPodcasts(): Promise<Podcast[]> {
    return this.appService.getPodcasts();
  }

  @Post('/podcasts')
  addPodcast(@Req() request: Request & { body: PodcastRequestBody }): string {
    console.log(request.body);
    const podcast = {
      title: request.body.title,
      epImageLink: request.body.epImageLink,
      description: request.body.description,
      link: request.body.link,
      pubDate: request.body.pubDate,
      enclosure: request.body.enclosure,
      audioType: request.body.audioType,
      starRating: request.body.starRating,
      host: request.body.host,
      level: request.body.level,
    };

    return this.appService.addPodcast(podcast);
  }
}
