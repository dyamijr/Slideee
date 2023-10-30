import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AuthenticatedGuard)
  @Get(':groupId/events')
  async getEvents(@Param('groupId') groupId: string){
    const events = await this.eventsService.getEvents(groupId);
    return events;
  }
}
