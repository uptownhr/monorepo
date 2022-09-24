import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import { ContactRepository } from './contact.repository';
import {DB} from '@uptownhr/prisma'

class CreateContactInput {
  email: string;
  name?: string;
}

@Controller('contact')
export class ContactController {
  constructor(private readonly contactRepository: ContactRepository) {}

  @Post()
  async create(@Body() contact: CreateContactInput): Promise<DB.Contact> {
    return this.contactRepository.create(contact);
  }

  @Put()
  async update(@Body() contact: DB.Contact): Promise<DB.Contact> {
    return this.contactRepository.update(contact);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DB.Contact> {
    return this.contactRepository.delete(id);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<DB.Contact | null> {
    return this.contactRepository.findOne(id);
  }

  @Get()
  async findAll(): Promise<DB.Contact[]> {
    return this.contactRepository.findAll();
  }
}
