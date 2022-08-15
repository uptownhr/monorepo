import { Contact } from '@prisma/client';
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import { ContactRepository } from './contact.repository';

class CreateContactInput {
  email: string;
  name?: string;
}

@Controller('contact')
export class ContactController {
  constructor(private readonly contactRepository: ContactRepository) {}

  @Post()
  async create(@Body() contact: CreateContactInput): Promise<Contact> {
    return this.contactRepository.create(contact);
  }

  @Put()
  async update(@Body() contact: Contact): Promise<Contact> {
    return this.contactRepository.update(contact);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Contact> {
    return this.contactRepository.delete(id);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Contact | null> {
    return this.contactRepository.findOne(id);
  }

  @Get()
  async findAll(): Promise<Contact[]> {
    return this.contactRepository.findAll();
  }
}
