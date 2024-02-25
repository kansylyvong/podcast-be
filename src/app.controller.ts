import {
  Controller,
  Get,
  Post,
  Req,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Podcast, PodcastRequestBody } from './app.model';
import { sign } from 'jsonwebtoken';
import { JwtGuard } from './app.jwtguard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtGuard)
  @Get('/podcasts')
  async getPodcasts(): Promise<Podcast[]> {
    return this.appService.getPodcasts();
  }
  @UseGuards(JwtGuard)
  @Post('/addpodcasts')
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
      played: request.body.played,
    };

    return this.appService.addPodcast(podcast);
  }
  @UseGuards(JwtGuard)
  @Post('/updatepodcast')
  async updatePodcast(
    @Req() request: Request & { body: PodcastRequestBody },
  ): Promise<string> {
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
      played: request.body.played,
    };

    return await this.appService.updatePodcast(podcast);
  }
  @UseGuards(JwtGuard)
  @Get('/refreshpodcasts')
  refreshPodcasts() {
    this.appService.refreshPodcasts();
  }

  @Post('/login')
  login(
    @Req() request: Request & { body: { username: string; password: string } },
  ): any {
    console.log(request.body);
    const result = this.appService.login(
      request.body.username,
      request.body.password,
    );

    if (result) {
      const token = sign(
        { username: request.body.username },
        'fake secret key for now',
        { expiresIn: '1h' },
      );
      return token;
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
  @Post('/createuser')
  createUser(
    @Req()
    request: Request & {
      body: {
        username: string;
        password: string;
        email: string;
        firstName: string;
        lastName: string;
      };
    },
  ) {
    console.log(request.body);
    this.appService.createUser(
      request.body.username,
      request.body.password,
      request.body.email,
      request.body.firstName,
      request.body.lastName,
    );
  }
}
