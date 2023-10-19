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
import { STATUS_CODES } from 'http';


@Injectable()
export class GroupsService {

  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  async createGroup(
    groupName: string,
    displayName: string,
    isPrivate: boolean,
    owner: UserDocument,
  ) {
    const group = await this.findOneByGroupName(groupName);
    if (group) {
      throw new BadRequestException('Group already exist');
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
      throw new NotFoundException('Group does not exist');
    }
    if (!group.admins.find((x) => x.equals(user._id))) {
      throw new UnauthorizedException('User is not an admin');
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
      throw new NotFoundException('Group does not exist');
    }
    if (!group.owner.equals(owner._id)) {
      throw new UnauthorizedException('User is not group owner');
    }
    await group.deleteOne();
    return STATUS_CODES.Success;;
  }

  async testFun(){
    return STATUS_CODES.Success;
  }
  
  async unfollowGroup(groupName: string, user: UserDocument){
    let group = await this.groupModel.findOne({
      groupName: groupName,
    });
    if (!group) {
      throw new BadRequestException('Group does not exist');
    }

    let index = group.followers.indexOf(user._id);

    if(index === -1){
      throw new BadRequestException('User is not a follower');
    }
    
    group.followers.splice(index, 1);

    await group.save();

    return group;
  }

  async removeAdmin(groupName: string, removeAdminId: mongoose.Types.ObjectId, user: UserDocument){
    let group = await this.groupModel.findOne({
      groupName: groupName,
    });
    if (!group) {
      throw new BadRequestException('Group does not exist');
    }
    if (!group.owner.equals(user._id)) {
      throw new UnauthorizedException('User is not the owner');
    }
    let index = group.admins.indexOf(removeAdminId);

    if(index === -1){
      throw new BadRequestException('User is not an admin');
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
