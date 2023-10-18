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
import { GroupInvitesService } from './groupInvites.service';
import * as mongoose from 'mongoose';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { User } from 'src/users/entities/user.entity';
import { UserDto } from 'src/groups/dto/user.dto';


@Controller('groupInvites')
export class GroupInvitesController {
  constructor(private readonly groupInvitesService: GroupInvitesService) {}

  @UseGuards(AuthenticatedGuard)
  @Post(':groupName/follow')
  async followGroup(@Param('groupName') groupName: string, @Request() req) {
    let group = await this.groupInvitesService.followGroup(groupName, req.user);
    return group;
  }
  
  @UseGuards(AuthenticatedGuard)
  @Post(':groupName/addAdmin')
  async addAdmin(@Param('groupName') groupName: string, @Body() userDto: UserDto, @Request() req) {
    let group = await this.groupInvitesService.addAdmin(groupName, userDto.user, req.user);
    return group;
  }
  
  @UseGuards(AuthenticatedGuard)
  @Post(':id/accept')
  async acceptInvite(@Request() req, @Param('id') inviteId: string) {
    const invite = await this.groupInvitesService.acceptInvite(inviteId, req.user);
    return invite;
  }
}
