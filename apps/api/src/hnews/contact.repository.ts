import { Injectable } from '@nestjs/common';
import { PrismaService, DB } from '@uptownhr/prisma';

export interface CreateContactInput {
  email: string;
  name?: string;
}

@Injectable()
export class ContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(contact: CreateContactInput): Promise<DB.Contact> {
    return this.prisma.contact.create({
      data: {
        ...contact,
      },
    });
  }

  async update(contact: DB.Contact): Promise<DB.Contact> {
    return this.prisma.contact.update({
      where: {
        id: contact.id,
      },
      data: {
        ...contact,
      },
    });
  }

  async delete(id: number): Promise<DB.Contact> {
    return this.prisma.contact.delete({
      where: {
        id,
      },
    });
  }

  async findOne(id: number): Promise<DB.Contact | null> {
    return this.prisma.contact.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<DB.Contact[]> {
    return this.prisma.contact.findMany();
  }
}
