import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventType } from '../events/AuditEvent';
import { Person } from './Person';

@Schema({ collection: 'person_audit' })
export class PersonAuditEntitySchema {
  @Prop()
  type: EventType;
  @Prop()
  old?: Person;
  @Prop()
  new?: Person;
  @Prop()
  extras: Map<string, object>;
}

export const PersonAuditSchema = SchemaFactory.createForClass(PersonAuditEntitySchema);
export type PersonAuditDocument = HydratedDocument<PersonAuditEntitySchema>;
