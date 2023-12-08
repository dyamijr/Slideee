import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { InviteHandlerService } from './inviteHandler.service';
import * as mongoose from 'mongoose';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { User } from 'src/users/entities/user.entity';
import { UserDto } from 'src/groups/dto/user.dto';
import { CreateEventDto } from 'src/events/dto/create-event.dto';


@Controller('inviteHandler')
export class InviteHandlerController {
  constructor(private readonly inviteHandlerService: InviteHandlerService) {}

  @UseGuards(AuthenticatedGuard)
  @Post(':groupName/follow')
  async followGroup(@Param('groupName') groupName: string, @Request() req) {
    let group = await this.inviteHandlerService.followGroup(groupName, req.user._id);
    return group;
  }
  
  @UseGuards(AuthenticatedGuard)
  @Post(':groupName/addAdmin')
  async addAdmin(@Param('groupName') groupName: string, @Body() userDto: UserDto, @Request() req) {
    let invite = await this.inviteHandlerService.addAdmin(groupName, new mongoose.Types.ObjectId(userDto.user), req.user._id);
    return invite;
  } 

  @UseGuards(AuthenticatedGuard)
  @Post(':groupName/transfer')
  async tranferOwnership(@Param('groupName') groupName: string, @Body() userDto: UserDto, @Request() req) {
    let invite = await this.inviteHandlerService.transferOwnership(groupName, new mongoose.Types.ObjectId(userDto.user), req.user._id);
    return invite;
  }
  
  @UseGuards(AuthenticatedGuard)
  @Post(':id/accept')
  async acceptInvite(@Request() req, @Param('id') inviteId: string) {
    const invite = await this.inviteHandlerService.acceptInvite(inviteId, req.user._id);
    return invite;
  }

  @UseGuards(AuthenticatedGuard)
  @Post('newEvent')
  async createEvent(@Request() req, @Body() createEventDto: CreateEventDto) {
    const event = await this.inviteHandlerService.createEvent(
      createEventDto.title,
      createEventDto.description,
      createEventDto.collaborators,
      createEventDto.location,
      createEventDto.date,
      req.user._id,
    );
    return event;
  }

}
