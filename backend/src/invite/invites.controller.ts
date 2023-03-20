import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InviteType } from 'src/schemas/invite.schema';
import { Types } from 'mongoose';

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  // create invite was being removed because we call the service from user/group

  // add req to make sure all recepient can accept the invite
  @Post(':id/accept')
  async acceptInvite(@Param('id') inviteId: string) {
    const invite = await this.invitesService.acceptInvite(inviteId);
    return invite;
  }

  @Post(':id/decline')
  async declineInvite(@Param('id') inviteId: string) {
    const invite = await this.invitesService.declineInvite(inviteId);
    return invite;
  }

  @Post(':id/remove')
  async removeInvite(@Param('id') inviteId: string) {
    const invite = await this.invitesService.removeInvite(inviteId);
    return invite;
  }
}
