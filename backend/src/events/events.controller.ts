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

  @UseGuards(AuthenticatedGuard)
  @Post(':id/unlike')
  async unlikeEvent(@Param('id') id: String, @Request() req) {
    const event = await this.eventsService.unlikeEvent(id, req.user);   
    return event;
  }
  
  @UseGuards(AuthenticatedGuard)
  @Post(':id/slide')
  async slideEvent(@Param('id') id: String, @Request() req) {
    const event = await this.eventsService.slideEvent(id, req.user);   
    return event;
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':id/unslide')
  async unslideEvent(@Param('id') id: String, @Request() req) {
    const event = await this.eventsService.unslideEvent(id, req.user);   
    return event;
  }

}