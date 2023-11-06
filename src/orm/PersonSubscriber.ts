import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, RemoveEvent, UpdateEvent } from 'typeorm';
import { Person } from '../models/Person';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuditEvent, EventType } from '../events/AuditEvent';

@EventSubscriber()
export class PersonSubscriber implements EntitySubscriberInterface<Person> {
  constructor(
    private eventEmitter: EventEmitter2,
    dataSource: DataSource,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Person;
  }

  async afterInsert(event: InsertEvent<Person>) {
    this.eventEmitter.emit(
      'person.insert',
      new AuditEvent<Person>({
        type: EventType.CREATE,
        old: null,
        new: event.entity,
        extras: {},
      }),
    );
  }

  async afterUpdate(event: UpdateEvent<Person>) {
    this.eventEmitter.emit(
      'person.update',
      new AuditEvent<Person>({
        type: EventType.UPDATE,
        old: event.databaseEntity,
        new: event.entity as Person,
        extras: {
          updatedRelations: event.updatedRelations,
          updatedColumns: event.updatedColumns,
        },
      }),
    );
  }

  async afterRemove(event: RemoveEvent<Person>) {
    this.eventEmitter.emit(
      'person.delete',
      new AuditEvent<Person>({
        type: EventType.DELETE,
        old: event.databaseEntity,
        new: null,
        extras: {
          entityId: event.entityId,
        },
      }),
    );
  }
}
