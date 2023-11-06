import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Person } from './models/Person';
import { PersonAudit } from './models/PersonAudit';
import { PersonAuditEntitySchema } from './models/PersonAuditSchema';

@Controller('/person')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  public async createPerson(@Body() person: Person): Promise<Person> {
    return this.appService.createPerson(person);
  }

  @Put('/:id')
  public async updatePerson(@Param('id') id: string, @Body() person: Partial<Person>): Promise<Person> {
    return this.appService.updatePerson(id, person);
  }

  @Get()
  public async getPersons(): Promise<Person[]> {
    return this.appService.getPersons();
  }

  @Get('/audit')
  public async getAudit(): Promise<PersonAudit[]> {
    return this.appService.getAudit();
  }

  @Get('/audit/mongo')
  public async getPersonsMongo(): Promise<PersonAuditEntitySchema[]> {
    return this.appService.getAuditMongo();
  }

  @Get('/:id')
  public async getPerson(@Param('id') id: string): Promise<Person> {
    return this.appService.getPerson(id);
  }
}
