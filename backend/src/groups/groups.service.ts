import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from '../schemas/group.schema';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  async createGroup(
    groupName: string,
    displayName: string,
    isPrivate: boolean,
    owner: User,
  ) {
    const group = await this.findOneByGroupName(groupName);
    if (group) {
      throw new BadRequestException();
    }

    const createdGroup = new this.groupModel({
      groupName: groupName,
      displayName: displayName,
      isPrivate: isPrivate,
      owner: owner,
      admins: [owner],
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
      throw new BadRequestException();
    }

    if (!group.admins.find((x) => x.equals(user._id))) {
      throw new BadRequestException();
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
      throw new BadRequestException();
    }
    if (!group.owner.equals(owner._id)) {
      throw new BadRequestException();
    }
    await group.deleteOne();
    return 'Success';
  }
}
