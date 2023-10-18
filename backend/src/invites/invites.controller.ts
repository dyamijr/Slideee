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
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { InvitesService } from './invites.service';

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @UseGuards(AuthenticatedGuard)
  @Post(':id/decline')
  async declineInvite(@Request() req, @Param('id') inviteId: string) {
    const invite = await this.invitesService.declineInvite(inviteId, req.user);
    return invite;
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':id/remove')
  async removeInvite(@Request() req, @Param('id') inviteId: string) {
    const invite = await this.invitesService.removeInvite(inviteId, req.user);
    return invite;
  }
}
