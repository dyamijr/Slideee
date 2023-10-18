import { Model } from 'mongoose';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
  forwardRef
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invite, InviteDocument } from '../schemas/invite.schema';
import { SchemaFactory } from '@nestjs/mongoose';
import { InviteType } from '../schemas/invite.schema';
import * as mongoose from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
//import { InvitesUtilService } from './inviteUtils.service';
//import { GroupsService } from 'src/groups/groups.service';
import { OnModuleInit } from '@nestjs/common/interfaces/hooks';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class InvitesService {

  constructor(
    @InjectModel(Invite.name) private inviteModel: Model<InviteDocument>,
    //private invitesUtilService: InvitesUtilService,
    //@Inject(forwardRef(() => GroupsService))
    //private groupsService: GroupsService,
  ) {}
  

  async createInvite(
    type: InviteType,
    sender: mongoose.Types.ObjectId,
    recipient: mongoose.Types.ObjectId,
    content?: mongoose.Types.ObjectId,
  ) {
    // TODO(reubenabu): Add check to avoid duplicate invites being created.
    const createdInvite = new this.inviteModel({
      type: type,
      sender: sender,
      recipient: recipient,
      content: content,
      created: new Date(),
    });
    await createdInvite.save();
    return createdInvite;
  }

  async declineInvite(inviteId: string, user: UserDocument) {
    const invite = await this.inviteModel.findById(inviteId);
    if (!invite) {
      throw new NotFoundException('Invite does not exist.');
    }
    await invite.deleteOne();
    return 'Success';
  }

  async removeInvite(inviteId: string, user: UserDocument) {
    const invite = await this.inviteModel.findById(inviteId);
    if (!invite) {
      throw new NotFoundException('Invite does not exist.');
    }
    await invite.deleteOne();
    return 'Success';
  }
}
