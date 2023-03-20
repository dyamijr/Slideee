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
    console.log("Here");
    const event = await this.eventsService.create(
      createEventDto.title,
      createEventDto.description,
      createEventDto.collaborators,
      req.user
    );
    return event;
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const event = await this.eventsService.findOne(+id);
    return event;
  }
}
