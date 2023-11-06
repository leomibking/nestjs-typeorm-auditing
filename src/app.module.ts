import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './models/Person';
import { PersonAudit } from './models/PersonAudit';
import { AuditingSubscriber } from 'typeorm-auditing';

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
      subscribers: [AuditingSubscriber]
    }),
    TypeOrmModule.forFeature([Person, PersonAudit])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
