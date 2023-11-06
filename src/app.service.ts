import { Injectable } from '@nestjs/common';
import { Person } from './models/Person';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonAudit } from './models/PersonAudit';
import { PersonAuditEntitySchema } from './models/PersonAuditSchema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Person) private readonly repository: Repository<Person>,
    @InjectRepository(PersonAudit)
    private readonly personAuditRepository: Repository<PersonAudit>,
    @InjectModel(PersonAuditEntitySchema.name) private readonly auditSchema: Model<PersonAuditEntitySchema>,
  ) {}

  createPerson(person: Person) {
    return this.repository.save(person);
  }

  async updatePerson(id: string, person: Partial<Person>) {
    await this.repository.update({ id }, { id, ...person });
    return this.getPerson(id);
  }

  getPersons() {
    return this.repository.find();
  }

  getPerson(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  getAudit() {
    return this.personAuditRepository.find({ order: { _seq: 'desc' } });
  }

  async getAuditMongo(): Promise<PersonAuditEntitySchema[]> {
    return this.auditSchema.find().exec();
  }
}
