import { createSSRApp } from "vue";
import { renderToString } from 'vue/server-renderer'
import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { HackerNewsFirstRepository } from './hacker-news-first.repository';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import test from './../test.vue';

class NewsReviewModel {
  id: number;
  title: string;
  url: string;
  upVotes: number;
  selectLink: string;
  skipLink: string;
  createdAt: Date;
}

@Controller('hnews')
export class HackerNewsController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly hnewsRepo: HackerNewsFirstRepository,
    private readonly config: ConfigService,
  ) {}

  @Get('/r/:id')
  async redirect(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<void> {
    const post = await this.hnewsRepo.getById(id);

    if (!post) {
      throw new Error('Not found');
    }

    await this.hnewsRepo.trackRedirectHit(id);

    res.redirect(post.url);
  }

  @Get('/to-review')
  async toReview(): Promise<NewsReviewModel[]> {
    const app = createSSRApp({
      data: () => ({ msg: 'hello' }),
      components: {
        test
      },
      template: `<div>{{ msg }} <test></test></div>`
    })
    console.log('vue', await renderToString(app))
    const host = this.config.get('HOST');
    const news = await this.hnewsRepo.toBeReviewed();
    this.logger.debug('news', { testing: 123 });
    return news.map((news) => {
      return {
        id: news.id,
        title: news.title,
        url: news.url,
        upVotes: news.upVotes,
        selectLink: `http://${host}/hnews/select/${news.id}`,
        skipLink: `http://${host}/hnews/skip/${news.id}`,
        createdAt: news.createdAt,
      };
    });
  }

  @Get('/select/:id')
  async selectNews(@Param('id', ParseIntPipe) id: number) {
    await this.hnewsRepo.selectNews(id);

    return true;
  }

  @Get('/skip/:id')
  async skipNews(@Param('id', ParseIntPipe) id: number) {
    await this.hnewsRepo.skipNews(id);

    return true;
  }

  @Get('/weekly-selected')
  async weeklyNews() {
    const news = await this.hnewsRepo.weeklyNews();

    return news.map((news) => {
      return {
        id: news.id,
        title: news.title,
        url: news.url,
        upVotes: news.upVotes,
        createdAt: news.createdAt,
      };
    });
  }
}
