import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class PodcastHttpService {
  constructor(private httpService: HttpService) {}

  getLatestPodcasts(): Observable<AxiosResponse<any>> {
    return this.httpService.get('https://www.dreamingspanish.com/');
  }
}
