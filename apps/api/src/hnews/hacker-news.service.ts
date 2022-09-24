import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { HackerNewsFirstRepository } from './hacker-news-first.repository';

import sgMail from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { ContactRepository } from './contact.repository';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

interface HNItem {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface NumberOneEntity {
  id: number;
  hnId: number;
  title: string;
  domain: string;
  url: string;
  upVotes: number;
  createdAt: Date;
}

const FROM_EMAIL = 'penguin@penguin.ws';
const dailyTemplateId = 'd-0a1cc68e8aee4513aea985151667a3db';
const weeklyTemplateId = 'd-1f21b6869d0b40b39b647fbaa49b7fcf';

function addRedirectLink(item: NumberOneEntity, host: string): NumberOneEntity {
  return {
    ...item,
    url: `//${host}/hnews/r/${item.id}`,
  };
}

@Injectable()
export class HackerNewsService {
  host: string;
  apiUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
  itemUrl = `https://hacker-news.firebaseio.com/v0/item/`;

  constructor(
    private readonly hnFirstRepo: HackerNewsFirstRepository,
    private readonly contactRepo: ContactRepository,
    private readonly config: ConfigService
  ) {
    const host = config.get('HOST');

    if (!host) throw new Error('HOST is not set');

    this.host = host;
  }

  async getNumberOne(): Promise<NumberOneEntity> {
    const res = await this.fetch();

    const one = await this.getItem(res[0]);

    return this.hnFirstRepo.save({
      hnId: one.id,
      title: one.title,
      url: one.url,
      upVotes: one.score,
    });
  }

  async fetch(): Promise<number[]> {
    const test = await axios(this.apiUrl);

    return test.data as unknown as number[];
  }

  async getItem(id: number): Promise<HNItem> {
    const url = this.itemUrl + `${id}.json`;
    const test = await axios(url);

    return test.data as unknown as HNItem;
  }

  async sendDailyEmail(): Promise<void> {
    console.log('sending daily email');
    const items = await this.hnFirstRepo.dailyList();

    if (items.length === 0) {
      return console.log('no daily list');
    }

    const itemsWithRedirectLink = items.map((item) =>
      addRedirectLink(item, this.host)
    );

    const contactList = await this.contactRepo.findAll();

    const messages: sgMail.MailDataRequired[] = contactList.map((contact) => {
      return {
        to: contact.email,
        from: FROM_EMAIL,
        templateId: dailyTemplateId,

        dynamicTemplateData: {
          items: itemsWithRedirectLink,
        },
      };
    });

    if (this.config.get('DISABLE_MAIL') !== 'true') {
      const res = await sgMail.send(messages);
      console.log('res', { res, items });
    }
  }

  async sendWeeklyEmail(): Promise<void> {
    console.log('sending weekly email');
    const items = await this.hnFirstRepo.weeklyNews();

    if (items.length === 0) {
      return console.log('nothing selected');
    }

    const itemsWithRedirectLink = items.map((item) =>
      addRedirectLink(item, this.host)
    );

    const contactList = await this.contactRepo.findAll();

    if (contactList.length === 0) return console.log('no contacts');

    const messages: sgMail.MailDataRequired[] = contactList.map((contact) => {
      return {
        to: contact.email,
        from: FROM_EMAIL,
        templateId: weeklyTemplateId,

        dynamicTemplateData: {
          items: itemsWithRedirectLink,
        },
      };
    });

    if (this.config.get('DISABLE_MAIL') !== 'true') {
      const res = await sgMail.send(messages);
      console.log('res', { res, items: itemsWithRedirectLink });
    }
  }
}
