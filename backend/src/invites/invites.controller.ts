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

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

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
