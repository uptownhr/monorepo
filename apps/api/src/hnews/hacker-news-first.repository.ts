import { DB, PrismaService } from '../../../../libs/prisma/src/lib/prisma.service';
import { NumberOneEntity } from './hacker-news.service';
import { Injectable } from '@nestjs/common';

function toEntity(one: DB.HackerNewsFirst): NumberOneEntity {
  const url = new URL(one.url);
  const domain = url.hostname;

  return {
    domain,
    id: one.id,
    hnId: one.hnId,
    title: one.title,
    url: one.url,
    upVotes: one.upVotes,
    createdAt: one.createdAt,
  };
}

type Save = Omit<NumberOneEntity, 'id' | 'createdAt' | 'domain'>;

enum HackerNewsSelectedStatus {
  SKIPPED = 'SKIPPED',
  SELECTED = 'SELECTED',
}

@Injectable()
export class HackerNewsFirstRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(data: Save): Promise<NumberOneEntity> {
    const one = await this.prisma.hackerNewsFirst.upsert({
      create: {
        hnId: data.hnId,
        url: data.url,
        title: data.title,
        upVotes: data.upVotes,
      },
      update: {
        upVotes: data.upVotes,
      },
      where: {
        hnId: data.hnId,
      },
    });

    return toEntity(one);
  }

  async dailyList(): Promise<NumberOneEntity[]> {
    const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const res = await this.prisma.hackerNewsFirst.findMany({
      where: {
        createdAt: {
          gte: yesterday,
        },
      },
    });

    return res.map(toEntity);
  }

  async getById(id: number) {
    const item = await this.prisma.hackerNewsFirst.findUnique({
      where: {
        id,
      },
    });

    if (!item) throw new Error('not found');

    return toEntity(item);
  }

  async selectNews(hnFirstId: number): Promise<void> {
    await this.getById(hnFirstId);

    await this.prisma.hackerNewsSelected.create({
      data: {
        hackerNewsFirstId: hnFirstId,
        status: HackerNewsSelectedStatus.SELECTED,
      },
    });
  }

  async skipNews(hnFirstId: number): Promise<void> {
    await this.getById(hnFirstId);

    await this.prisma.hackerNewsSelected.create({
      data: {
        hackerNewsFirstId: hnFirstId,
        status: HackerNewsSelectedStatus.SKIPPED,
      },
    });
  }

  async toBeReviewed(): Promise<NumberOneEntity[]> {
    const res = await this.prisma.hackerNewsFirst.findMany({
      where: {
        HackerNewsSelected: {
          is: null,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.map(toEntity);
  }

  async weeklyNews(): Promise<NumberOneEntity[]> {
    const lastWeek = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
    const res = await this.prisma.hackerNewsSelected.findMany({
      select: {
        hackerNewsFirst: {
          select: {
            id: true,
            hnId: true,
            title: true,
            url: true,
            upVotes: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      where: {
        status: HackerNewsSelectedStatus.SELECTED,
        createdAt: {
          gte: lastWeek,
        },
      },
    });

    return res.map((item) => toEntity(item.hackerNewsFirst));
  }

  async trackRedirectHit(id: number): Promise<void> {
    await this.prisma.hackerNewsRedirectHit.create({
      data: {
        hackerNewsFirstId: id,
      },
    });
  }
}
