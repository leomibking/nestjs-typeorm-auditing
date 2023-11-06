import {
  AuditingAction,
  AuditingEntity,
  AuditingEntityDefaultColumns,
} from 'typeorm-auditing';
import { Person } from './Person';

@AuditingEntity(Person)
export class PersonAudit
  extends Person
  implements AuditingEntityDefaultColumns
{
  readonly _seq: number;
  readonly _action: AuditingAction;
  readonly _modifiedAt: Date;
}
