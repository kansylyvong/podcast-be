import { Schema, model } from 'mongoose';

export interface Podcast {
  title: string;
  epImageLink: string;
  description: string;
  link: string;
  pubDate: string;
  enclosure: string;
  audioType: string;
  starRating: number;
  host: string;
  level: string;
  played: boolean;
}

export interface PodcastRequestBody {
  title: string;
  epImageLink: string;
  description: string;
  link: string;
  pubDate: string;
  enclosure: string;
  audioType: string;
  starRating: number;
  host: string;
  level: string;
  played: boolean;
}

export interface PodcastDocument extends Podcast, Document {}

export const podcastSchema = new Schema<Podcast>({
  title: String,
  epImageLink: String,
  description: String,
  link: String,
  pubDate: String,
  enclosure: String,
  audioType: String,
  starRating: Number,
  host: String,
  level: String,
  played: Boolean,
});

export const PodcastModel = model<PodcastDocument>(
  'PodcastData',
  podcastSchema,
);
