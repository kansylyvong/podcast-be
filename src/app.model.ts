import { create } from 'domain';
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

export interface User {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  created: Date;
  lastUpdate: Date;
}

export const UserSchema = new Schema<User>({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  created: Date,
  lastUpdate: Date,
});

export const PodcastModel = model<PodcastDocument>(
  'PodcastData',
  podcastSchema,
);
export const UserModel = model<User>('UserData', UserSchema);
