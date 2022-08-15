import { Contact } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

export interface CreateContactInput {
  email: string;
  name?: string;
}

@Injectable()
export class ContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(contact: CreateContactInput): Promise<Contact> {
    return this.prisma.contact.create({
      data: {
        ...contact,
      },
    });
  }

  async update(contact: Contact): Promise<Contact> {
    return this.prisma.contact.update({
      where: {
        id: contact.id,
      },
      data: {
        ...contact,
      },
    });
  }

  async delete(id: number): Promise<Contact> {
    return this.prisma.contact.delete({
      where: {
        id,
      },
    });
  }

  async findOne(id: number): Promise<Contact | null> {
    return this.prisma.contact.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<Contact[]> {
    return this.prisma.contact.findMany();
  }
}
