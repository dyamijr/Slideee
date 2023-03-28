import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from '../schemas/event.schema';
import { GroupsModule } from 'src/groups/groups.module';
import { InvitesModule } from 'src/invites/invites.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    GroupsModule,
    InvitesModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
