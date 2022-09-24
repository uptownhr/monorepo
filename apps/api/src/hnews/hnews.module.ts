import { Module } from '@nestjs/common';
import { HackerNewsService } from './hacker-news.service';
import { HackerNewsFirstRepository } from './hacker-news-first.repository';
import { ConfigModule } from '@nestjs/config';
import { ContactRepository } from './contact.repository';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    HackerNewsService,
    HackerNewsFirstRepository,
    ContactRepository,
  ],
})
export class HackerNewsModule {}
