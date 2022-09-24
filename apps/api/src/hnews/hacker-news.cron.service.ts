import { HackerNewsService } from './hacker-news.service';
import { Cron } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HackerNewsCronService {
  constructor(private readonly service: HackerNewsService) {}

  @Cron('0 * * * * *')
  async cronSyncNumberOne(): Promise<void> {
    const numOne = await this.service.getNumberOne();
    console.log({ numOne });
  }

  @Cron('0 0 9 * * *', {
    name: 'sendDailyEmail',
    timeZone: 'America/Los_Angeles',
  })
  async sendDailyEmail(): Promise<void> {
    return this.service.sendDailyEmail();
  }

  @Cron('0 0 15 * * SUN', {
    name: 'sendWeeklyEmail',
    timeZone: 'America/Los_Angeles',
  })
  async sendWeeklyEmail(): Promise<void> {
    return this.service.sendWeeklyEmail();
  }
}
