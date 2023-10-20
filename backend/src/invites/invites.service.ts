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


@Injectable()
export class InvitesService {

  constructor(
    @InjectModel(Invite.name) private inviteModel: Model<InviteDocument>,
  ) {}
  
  async findById(id: string){
    const invite = await this.inviteModel.findById(id);
    return invite;
  }

  async isValidInvite(id: string){
    const invite = await this.findById(id);
    if(invite){
      return true;
    }
    return false;
  }

  async getInviteType(id: string){
    const invite = await this.findById(id);
    return invite.type;
  }

  async getInviteSender(id: string){
    const invite = await this.findById(id);
    return invite.sender;
  }

  async getInviteRecipient(id: string){
    const invite = await this.findById(id);
    return invite.recipient;
  }

  async getInviteContent(id: string){
    const invite = await this.findById(id);
    return invite.content;
  }

  async getInviteStatus(id: string){
    const invite = await this.findById(id);
    return invite.accepted;
  }

  async acceptInvite(id: string){
    const invite = await this.findById(id);
    invite.accepted = true;
    await invite.save();
    return invite._id;
  }

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

  async declineInvite(inviteId: string, user: mongoose.Types.ObjectId) {
    const invite = await this.inviteModel.findById(inviteId);
    if (!invite) {
      throw new NotFoundException('Invite does not exist.');
    }
    await invite.deleteOne();
    return 'Success';
  }

  async removeInvite(inviteId: string, user: mongoose.Types.ObjectId) {
    const invite = await this.inviteModel.findById(inviteId);
    if (!invite) {
      throw new NotFoundException('Invite does not exist.');
    }
    await invite.deleteOne();
    return 'Success';
  }
}
