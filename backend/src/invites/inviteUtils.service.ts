import { Model } from 'mongoose';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Group, GroupDocument } from 'src/schemas/group.schema';
import { STATUS_CODES } from 'http';

@Injectable()
export class InvitesUtilService {
  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  
  async adminAccept(groupId: mongoose.Types.ObjectId, adminId: mongoose.Types.ObjectId){
    let group = await this.groupModel.findById(groupId);
    if (!group) {
      throw new BadRequestException();
    }

    group.admins.push(adminId);

    group.save();

    return STATUS_CODES.Success;
  }

  async acceptFollow(groupId: mongoose.Types.ObjectId, followId: mongoose.Types.ObjectId){
    let group = await this.groupModel.findById(groupId);
    if (!group) {
      throw new BadRequestException();
    }

    group.followers.push(followId);

    group.save();

    return STATUS_CODES.Success;
 }

}