import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AuthenticatedGuard)
  @Post('new')
  async create(@Body() createEventDto: CreateEventDto) {
    let event = await this.eventsService.create(createEventDto.title, createEventDto.description);
    return event;
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    let event = await this.eventsService.findOne(+id);
    return event;
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':id/like')
  async likeEvent(@Request() req, @Param('id') id: string) {
    return await this.eventsService.likeEvent(+id, req.user);
  }
}
