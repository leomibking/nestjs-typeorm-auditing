import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuditEvent } from './AuditEvent';
import { Person } from '../models/Person';

@Injectable()
export class PersonAuditEventListener {
  @OnEvent('person.insert')
  public handlePersonCreated(payload: AuditEvent<Person>) {
    console.log(`INSERT:: OLD=${JSON.stringify(payload.old)} NEW=${JSON.stringify(payload.new)}`);
    console.log(`INSERT:: EVENT=${JSON.stringify(payload)}`);
  }

  @OnEvent('person.update')
  public handlePersonUpdate(payload: AuditEvent<Person>) {
    console.log(`UPDATE:: OLD=${JSON.stringify(payload.old)} NEW=${JSON.stringify(payload.new)}`);
    console.log(`UPDATE:: EVENT=${JSON.stringify(payload)}`);
  }

  @OnEvent('person.delete')
  public handlePersonDelete(payload: AuditEvent<Person>) {
    console.log(`DELETE:: OLD=${JSON.stringify(payload.old)} NEW=${JSON.stringify(payload.new)}`);
    console.log(`DELETE:: EVENT=${JSON.stringify(payload)}`);
  }
}
