import { Model } from 'mongoose';
import { Injectable, BadRequestException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invite, InviteDocument } from '../schemas/invite.schema';
import * as bcrypt from "bcrypt";
import { Schema, SchemaFactory } from '@nestjs/mongoose';




@Injectable()
export class InviteService {
  constructor(@InjectModel(/*what do I put in here*/ ) private inviteModel: Model<InviteDocument>) {}
  

// to create an invite: invite type, sender, recepient and expiry time 

  async createInvite(type : string , sender : Schema.objectId, recepient: Schema.objectId,content : string,expires: Date) {
    
      //first make sure invite type is valid 
    /*1. "follow_request"
      2. "become_admin"
      3.  
    */
    //add functionality to prevent sending multiple invites 

    //set date now to the current date 
    let datenow:Date = new Date()
    const createdInvite = new this.inviteModel({
        type : type,
        sender: sender,
        recepient: recepient,
        created: new Date(),
        expires : expires,
        content: content

    });
    await createdInvite.save();

    return createdInvite;
  }

  async acceptInvite(username: string, displayName: string, password: string) {
    

    return;
  }

  async declineInvite(username: string, displayName: string, password: string) {
    

    return;
  }

  async removeInvite(username: string, displayName: string, password: string) {
    

    return;
  }

}
