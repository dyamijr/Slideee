import { Model } from 'mongoose';
import { Injectable, BadRequestException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invite, InviteDocument } from '../schemas/invite.schema';
import { SchemaFactory } from '@nestjs/mongoose';
import { InviteType } from '../schemas/invite.schema';
import * as mongoose from 'mongoose';
import { ObjectId } from "mongodb";

@Injectable()
export class InvitesService {
  constructor(@InjectModel(Invite.name) private inviteModel: Model<InviteDocument>) {}
  // to create an invite: invite type, sender, recepient and expiry time 
  //remember ot add back expires
  async createInvite(type: InviteType, sender: mongoose.Types.ObjectId, recipient: mongoose.Types.ObjectId) {
    
      //first make sure invite type is valid 
    /*1. "follow_request"
      2. "become_admin"
      3.  */
    //add functionality to prevent sending multiple invites 
    //set date now to the current date 
    const createdInvite = new this.inviteModel({
      type : type,
      sender: sender,
      recipient: recipient,
      created: new Date(),
    });
    
    await createdInvite.save();
    return createdInvite;
  }
  //Requres valid invite object id 
 async acceptInvite(inviteId:string) {
    
    let invite = await this.inviteModel.findById(inviteId);
    
    if (!invite) {
      throw new BadRequestException("invite does not exist");
    }
    //accept the invite
    invite.accepted = true;
    await invite.save();
    return invite;
  }

  async declineInvite(inviteId:string) {
    let invite = await this.inviteModel.findById(inviteId);
    if (!invite) {
      throw new BadRequestException("invite does not exist");
    }
    await invite.deleteOne();
    return 'Success';
  }

  async removeInvite(inviteId:string) {
    let invite = await this.inviteModel.findById(inviteId);
    if (!invite) {
      throw new BadRequestException("invite does not exist");
    }
    await invite.deleteOne();
    return 'Success';
    

  }

}
