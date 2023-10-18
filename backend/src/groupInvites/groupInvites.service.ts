import { Model } from 'mongoose';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
  Inject
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { STATUS_CODES } from 'http';
import { ModuleRef} from '@nestjs/core';
import { OnModuleInit } from '@nestjs/common/interfaces/hooks';
import { Group, GroupDocument } from '../schemas/group.schema';
import { Invite, InviteDocument } from '../schemas/invite.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { InvitesService } from 'src/invites/invites.service';
import { InviteType } from '../schemas/invite.schema';



@Injectable()
export class GroupInvitesService {

  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    @InjectModel(Invite.name) private inviteModel: Model<InviteDocument>,
    private invitesService: InvitesService
  ) {}

  async followGroup(groupName: string, user: UserDocument){
    let group = await this.groupModel.findOne({
      groupName: groupName,
    });
    if (!group) {
      throw new BadRequestException();
    }
    if(group.admins.find(x => x.equals(user._id))){
      throw new BadRequestException();
    }
    if(group.followers.find(x => x.equals(user._id))){
      throw new BadRequestException();
    }
    if(!group.isPrivate){
      group.followers.push(user._id);
    }
    else{
      let invite = this.invitesService.createInvite(
        InviteType.FollowRequest,
        user._id,
        group._id,
      );
      return invite;
    }
    await group.save();

    return group;
  }

    async addAdmin(groupName: string, userToAdmin: mongoose.Types.ObjectId, user: UserDocument){
      let group = await this.groupModel.findOne({
        groupName: groupName,
      });
      if (!group) {
        throw new BadRequestException();
      }
      if(!userToAdmin){
        throw new BadRequestException();
      }
      if(!group.admins.find(x => x.equals(user._id))){
        throw new UnauthorizedException();
      }
      if(group.admins.find(x => x.equals(userToAdmin))){
        throw new BadRequestException();
      }

      //To Do add checks to make sure there is not an invite of this type already
      //add checks to make sure userToAdmin is a user

      let invite = this.invitesService.createInvite(
        InviteType.AdminRequest,
        group._id,
        userToAdmin,
      );
  
      return invite;
    }

    async acceptInvite(inviteId: string, user: UserDocument) {
      const invite = await this.inviteModel.findById(inviteId);
      if (!invite) {
        throw new NotFoundException('invite does not exist');
      }
      if(invite.type === InviteType.AdminRequest){
        if(invite.recipient != user._id.valueOf()){
          throw new BadRequestException();
        }
        let group = await this.groupModel.findById(invite.sender);
        if(!group){
          throw new BadRequestException();
        }
        
        group.admins.push(user._id);
        await group.save();
      }
      else if(invite.type === InviteType.FollowRequest){
        let group = await this.groupModel.findById(invite.recipient);
        if(!group){
          throw new BadRequestException();
        }
        if(!group.admins.find(x => x.equals(user._id))){
          throw new UnauthorizedException();
        }
        group.followers.push(invite.sender);
        await group.save();
      }
      
      invite.accepted = true;
      await invite.save();
      return invite;
    }
}
