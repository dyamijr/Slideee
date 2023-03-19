import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InviteType } from 'src/schemas/invite.schema';
import { Types } from 'mongoose';

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}
 
  @Post('new')
  async createInvite() {
    let sender = new Types.ObjectId();
    let recipient = new Types.ObjectId();
    let invite = this.invitesService.createInvite(InviteType.FollowRequest, sender, recipient);
    return invite;
  }

}
