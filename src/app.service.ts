import { Injectable } from '@nestjs/common';
import { Person } from './models/Person';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Person) private readonly repository: Repository<Person>
  ) {
  }

  createPerson(person: Person) {
    return this.repository.save(person);
  }

  async updatePerson(id: string, person: Partial<Person>) {
    await this.repository.update({ id }, person);
    return this.getPerson(id);
  }

  getPersons() {
    return this.repository.find();
  }

  getPerson(id: string) {
    return this.repository.findOne({ where: { id } });
  }
}
