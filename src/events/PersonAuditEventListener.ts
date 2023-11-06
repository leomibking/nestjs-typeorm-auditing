import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuditEvent } from './AuditEvent';
import { Person } from '../models/Person';
import { InjectModel } from '@nestjs/mongoose';
import { PersonAuditEntitySchema } from '../models/PersonAuditSchema';
import { Model } from 'mongoose';

@Injectable()
export class PersonAuditEventListener {
  constructor(
    @InjectModel(PersonAuditEntitySchema.name) private readonly auditSchema: Model<PersonAuditEntitySchema>,
  ) {}

  @OnEvent('person.insert')
  public async handlePersonCreated(payload: AuditEvent<Person>) {
    console.log(`INSERT:: OLD=${JSON.stringify(payload.old)} NEW=${JSON.stringify(payload.new)}`);
    console.log(`INSERT:: EVENT=${JSON.stringify(payload)}`);
    const created = new this.auditSchema(payload);
    await created.save();
  }

  @OnEvent('person.update')
  public async handlePersonUpdate(payload: AuditEvent<Person>) {
    console.log(`UPDATE:: OLD=${JSON.stringify(payload.old)} NEW=${JSON.stringify(payload.new)}`);
    console.log(`UPDATE:: EVENT=${JSON.stringify(payload)}`);
    const created = new this.auditSchema(payload);
    await created.save();
  }

  @OnEvent('person.delete')
  public async handlePersonDelete(payload: AuditEvent<Person>) {
    console.log(`DELETE:: OLD=${JSON.stringify(payload.old)} NEW=${JSON.stringify(payload.new)}`);
    console.log(`DELETE:: EVENT=${JSON.stringify(payload)}`);
    const created = new this.auditSchema(payload);
    await created.save();
  }
}
