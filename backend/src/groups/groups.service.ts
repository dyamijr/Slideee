import { Model } from 'mongoose';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from '../schemas/group.schema';
import { User, UserDocument } from '../schemas/user.schema';
import * as mongoose from 'mongoose';
import { InviteType } from 'src/schemas/invite.schema';
import { InvitesService } from 'src/invites/invites.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    private invitesService: InvitesService,
    private usersService: UsersService,
  ) {}

  async createGroup(
    groupName: string,
    displayName: string,
    isPrivate: boolean,
    owner: UserDocument,
  ) {
    const group = await this.findOneByGroupName(groupName);
    if (group) {
      throw new BadRequestException();
    }
    const createdGroup = new this.groupModel({
      groupName: groupName,
      displayName: displayName,
      isPrivate: isPrivate,
      owner: owner._id,
      admins: [owner],
      followers: [],
    });
    await createdGroup.save();
    return createdGroup;
  }

  async findOneByGroupName(groupName: string) {
    const group = await this.groupModel.findOne({
      groupName: groupName,
    });
    return group;
  }

  async findOneById(groupId: string) {
    const group = await this.groupModel.findById(groupId);
    return group;
  }

  async editGroup(
    groupName: string,
    displayName: string,
    isPrivate: boolean,
    user: UserDocument,
  ) {
    const group = await this.groupModel.findOne({
      groupName: groupName,
    });
    if (!group) {
      throw new NotFoundException();
    }
    if (!group.admins.find((x) => x.equals(user._id))) {
      throw new UnauthorizedException();
    }
    group.displayName = displayName;
    group.isPrivate = isPrivate;
    await group.save();
    return group;
  }

  async deleteGroup(groupName: string, owner: UserDocument) {
    const group = await this.groupModel.findOne({
      groupName: groupName,
    });
    if (!group) {
      throw new NotFoundException();
    }
    if (!group.owner.equals(owner._id)) {
      throw new UnauthorizedException();
    }
    await group.deleteOne();
    return 'Success';
  }
  
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
      this.invitesService.createInvite(
        InviteType.FollowRequest,
        user._id,
        group._id,
      );
    }
    await group.save();

    return group;
  }
  async unfollowGroup(groupName: string, user: UserDocument){
    let group = await this.groupModel.findOne({
      groupName: groupName,
    });
    if (!group) {
      throw new BadRequestException();
    }

    let index = group.followers.indexOf(user._id);

    if(index === -1){
      throw new BadRequestException();
    }
    
    group.followers.splice(index, 1);

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
    if(!group.admins.find(x => x.equals(user._id))){
      throw new UnauthorizedException();
    }
    if(group.admins.find(x => x.equals(userToAdmin))){
      throw new BadRequestException();
    }

    this.invitesService.createInvite(
      InviteType.AdminRequest,
      group._id,
      userToAdmin,
    );

    await group.save();

    return group;
  }
  async removeAdmin(groupName: string, removeAdminId: mongoose.Types.ObjectId, user: UserDocument){
    let group = await this.groupModel.findOne({
      groupName: groupName,
    });
    if (!group) {
      console.log("test1");
      throw new BadRequestException();
    }
    console.log(removeAdminId);
    if (!group.owner.equals(user._id)) {
      console.log("test2");
      throw new UnauthorizedException();
    }
    console.log(removeAdminId);
    let index = group.admins.indexOf(removeAdminId);

    if(index === -1){
      console.log("test3");
      throw new BadRequestException();
    }
    
    group.admins.splice(index, 1);

    await group.save();

    return group;

  }
  // TODO: Get requests where the group is a sender and where the group is a recipient.
  async getGroupCollaborationRequests() {
    return [];
  }

  async queryGroups(groupNameQuery: string) {
    const groups = await this.groupModel.find({
      groupName: new RegExp(`.*${groupNameQuery}.*`, 'i'),
    });
    return groups;
  }
}
