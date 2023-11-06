export class AuditEvent<T> {
  type: EventType;
  old?: T;
  new?: T;

  extras: any;

  constructor(data: Partial<AuditEvent<T>>) {
    Object.assign(this, data);
  }
}

export enum EventType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}
