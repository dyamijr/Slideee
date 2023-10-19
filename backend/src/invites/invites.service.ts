import { Model } from 'mongoose';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invite, InviteDocument } from '../schemas/invite.schema';
import { InviteType } from '../schemas/invite.schema';
import * as mongoose from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';


@Injectable()
export class InvitesService {

  constructor(
    @InjectModel(Invite.name) private inviteModel: Model<InviteDocument>,
  ) {}
  

  async createInvite(
    type: InviteType,
    sender: mongoose.Types.ObjectId,
    recipient: mongoose.Types.ObjectId,
    content?: mongoose.Types.ObjectId,
  ) {

    const invite = await this.inviteModel.findOne({
      type: type,
      sender: sender,
      recipient: recipient,
    });

    if(invite){
      throw new BadRequestException('Invite already exist.');
    }

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
