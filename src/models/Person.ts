import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'person' })
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  active: boolean;

  @Column({ name: 'name', type: 'text', nullable: false })
  name: string;

  @Column({ name: 'last_name', type: 'text', nullable: false })
  lastName: string;
}
