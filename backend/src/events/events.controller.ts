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
  @Post('new')
  async create(@Request() req, @Body() createEventDto: CreateEventDto) {
    const event = await this.eventsService.create(
      createEventDto.title,
      createEventDto.description,
      createEventDto.collaborators,
      req.user,
    );
    return event;
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':id/like')
  async likeEvent(@Param('id') id: String, @Request() req) {
    const event = await this.eventsService.likeEvent(id, req.user);   
    return event;
  }
}