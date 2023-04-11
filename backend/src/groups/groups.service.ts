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
@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    private invitesService: InvitesService,
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

  async getEventCollaborationRequests(groupId: string, admin: UserDocument) {
    const group = await this.groupModel.findById(groupId);
    if (!group) {
      throw new NotFoundException();
    }

    if (!group.admins.find((x) => x.equals(admin._id))) {
      throw new UnauthorizedException();
    }
    
    const invites = await this.invitesService.findInvites(
      InviteType.CollaboratorRequest,
      group._id,
    );
    // console.log(groupId);
    return invites;
  }

  async queryGroups(groupNameQuery: string) {
    const groups = await this.groupModel.find({
      groupName: new RegExp(`.*${groupNameQuery}.*`, 'i'),
    });
    return groups;
  }
}
