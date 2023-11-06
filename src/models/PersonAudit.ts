import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Person } from './Person';
import { Column } from 'typeorm';

@AuditingEntity(Person)
export class PersonAudit
  extends Person
  implements AuditingEntityDefaultColumns {
  readonly _seq: number;
  readonly _action: AuditingAction;
  @Column({ name: '_modified_at' })
  readonly _modifiedAt: Date;
}
