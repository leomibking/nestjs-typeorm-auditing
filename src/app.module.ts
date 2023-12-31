import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './models/Person';
import { PersonAudit } from './models/PersonAudit';
import { AuditingSubscriber } from 'typeorm-auditing';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PersonSubscriber } from './orm/PersonSubscriber';
import { PersonAuditEventListener } from './events/PersonAuditEventListener';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonAuditEntitySchema, PersonAuditSchema } from './models/PersonAuditSchema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      database: 'audit',
      username: 'audit',
      password: 'audit',
      migrationsRun: false,
      autoLoadEntities: true,
      logging: 'all',
      subscribers: [AuditingSubscriber],
    }),
    TypeOrmModule.forFeature([Person, PersonAudit]),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    MongooseModule.forRoot('mongodb://audit:audit@localhost:27027'),
    MongooseModule.forFeature([{ name: PersonAuditEntitySchema.name, schema: PersonAuditSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, PersonSubscriber, PersonAuditEventListener],
})
export class AppModule {}
