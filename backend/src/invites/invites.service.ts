import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invite, InviteDocument } from '../schemas/invite.schema';
import { SchemaFactory } from '@nestjs/mongoose';
import { InviteType } from '../schemas/invite.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class InvitesService {
  constructor(
    @InjectModel(Invite.name) private inviteModel: Model<InviteDocument>,
  ) {}

  async createInvite(
    type: InviteType,
    sender: mongoose.Types.ObjectId,
    recipient: mongoose.Types.ObjectId,
  ) {
    // TODO(reubenabu): Add check to avoid duplicate invites being created.
    const createdInvite = new this.inviteModel({
      type: type,
      sender: sender,
      recipient: recipient,
      created: new Date(),
    });
    await createdInvite.save();
    return createdInvite;
  }

  async acceptInvite(inviteId: string) {
    const invite = await this.inviteModel.findById(inviteId);
    if (!invite) {
      throw new BadRequestException('invite does not exist');
    }
    invite.accepted = true;
    await invite.save();
    return 'Success';
  }

  async declineInvite(inviteId: string) {
    const invite = await this.inviteModel.findById(inviteId);
    if (!invite) {
      throw new BadRequestException('Invite does not exist.');
    }
    await invite.deleteOne();
    return 'Success';
  }

  async removeInvite(inviteId: string) {
    const invite = await this.inviteModel.findById(inviteId);
    if (!invite) {
      throw new BadRequestException('Invite does not exist.');
    }
    await invite.deleteOne();
    return 'Success';
  }
}
