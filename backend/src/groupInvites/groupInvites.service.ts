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
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private invitesService: InvitesService
  ) {}

  async followGroup(groupName: string, user: UserDocument){
    let group = await this.groupModel.findOne({
      groupName: groupName,
    });
    if (!group) {
      throw new BadRequestException('Group does not exist');
    }
    if(group.admins.find(x => x.equals(user._id))){
      throw new BadRequestException('User is already an admin');
    }
    if(group.followers.find(x => x.equals(user._id))){
      throw new BadRequestException('User is already a follower');
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
        throw new BadRequestException('Group does not exist');
      }
      if(!group.admins.find(x => x.equals(user._id))){
        throw new UnauthorizedException('User is not an admin');
      }
      if(!this.userModel.findById(userToAdmin)){
        throw new BadRequestException('User does not exist');
      }
      if(group.admins.find(x => x.equals(userToAdmin))){
        throw new BadRequestException('User is already an admin');
      }

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
        throw new NotFoundException('Invite does not exist');
      }
      if(invite.type === InviteType.AdminRequest){
        if(invite.recipient != user._id.valueOf()){
          throw new UnauthorizedException('Incorrect user');
        }
        let group = await this.groupModel.findById(invite.sender);
        if(!group){
          throw new BadRequestException('Group does not exist');
        }
        
        group.admins.push(user._id);
        await group.save();
      }
      else if(invite.type === InviteType.FollowRequest){
        let group = await this.groupModel.findById(invite.recipient);
        if(!group){
          throw new BadRequestException('Group does not exist');
        }
        if(!group.admins.find(x => x.equals(user._id))){
          throw new UnauthorizedException('User is not an admin');
        }
        group.followers.push(invite.sender);
        await group.save();
      }
      
      invite.accepted = true;
      await invite.save();
      return invite;
    }
}
