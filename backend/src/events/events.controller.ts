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
import mongoose from 'mongoose';
import { CommentDto } from './dto/comment.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AuthenticatedGuard)
  @Post(':id/like')
  async likeEvent(@Param('id') id: string, @Request() req) {
    const event = await this.eventsService.likeEvent(id, req.user._id);   
    return event._id;
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':id/unlike')
  async unlikeEvent(@Param('id') id: string, @Request() req) {
    const event = await this.eventsService.unlikeEvent(id, req.user._id);   
    return event._id;
  }
  
  @UseGuards(AuthenticatedGuard)
  @Post(':id/slide')
  async slideEvent(@Param('id') id: string, @Request() req) {
    const event = await this.eventsService.slideEvent(id, req.user._id);   
    return event._id;
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':id/unslide')
  async unslideEvent(@Param('id') id: string, @Request() req) {
    const event = await this.eventsService.unslideEvent(id, req.user._id);   
    return event._id;
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':id/newComment')
  async commentEvent(@Param('id') id: string, @Body() comm: CommentDto, @Request() req) {
    const comment = await this.eventsService.commentEvent(id, comm.content, req.user._id);   
    return comment._id;
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':id/:cid/edit')
  async editComment(@Param('id') id: string, @Param('cid') cid: string, @Body() comm: CommentDto, @Request() req) {
    const comment = await this.eventsService.editComment(id, cid, comm.content, req.user._id);   
    return comment._id;
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':id/:cid/delete')
  async deleteComment(@Param('id') id: string, @Param('cid') cid: string, @Request() req) {
    const comment = await this.eventsService.deleteComment(id, cid, req.user._id);   
    return comment;
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':groupId/events')
  async getEvents(@Param('groupId') groupId: string) {
    const events = await this.eventsService.getEvents(groupId);
    return events;
  }
}
