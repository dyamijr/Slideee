import { Model } from 'mongoose';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from '../schemas/group.schema';
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
    owner: mongoose.Types.ObjectId,
  ) {
    const group = await this.findOneByGroupName(groupName);
    if (group) {
      throw new BadRequestException('Group already exist');
    }
    const createdGroup = new this.groupModel({
      groupName: groupName,
      displayName: displayName,
      isPrivate: isPrivate,
      owner: owner,
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

  async findOneById(groupId: mongoose.Types.ObjectId) {
    const group = await this.groupModel.findById(groupId);
    return group;
  }

  async isValidGroupByName(groupName: string){
    if(await this.findOneByGroupName(groupName)){
      return true;
    }
    return false;
  }

  async isValidGroupById(groupId: mongoose.Types.ObjectId){
    if(await this.findOneById(groupId)){
      return true;
    }
    return false;
  }

  async getFollowers(groupName: string){
    const group = await this.findOneByGroupName(groupName);
    return group.followers;
  }

  async getAdmins(groupName: string){
    const group = await this.findOneByGroupName(groupName);
    return group.admins;
  }
 
  async getIdFromGroupName(groupName: string){
    const group = await this.findOneByGroupName(groupName);
    return group._id;
  }

  async isAdmin(groupId: mongoose.Types.ObjectId, user: mongoose.Types.ObjectId){
    const group = await this.findOneById(groupId)
    return group.admins.find(x => x.equals(user));
  }
  async isOwner(groupId: mongoose.Types.ObjectId, user: mongoose.Types.ObjectId){
    const group = await this.findOneById(groupId)
    return group.owner.equals(user);
  }

  async isFollower(groupId: mongoose.Types.ObjectId, user: mongoose.Types.ObjectId){
    const group = await this.findOneById(groupId)
    return group.followers.find(x => x.equals(user));
  }

  async isPrivate(groupId: mongoose.Types.ObjectId){
    const group = await this.findOneById(groupId)
    return group.isPrivate;
  }

  async addFollower(groupId: mongoose.Types.ObjectId, user: mongoose.Types.ObjectId){
    const group = await this.findOneById(groupId);
    group.followers.push(user);
    group.save();
    return group;
  }
  async addAdmin(groupId: mongoose.Types.ObjectId, user: mongoose.Types.ObjectId){
    const group = await this.findOneById(groupId);
    group.admins.push(user);
    group.save();
    return group;
  }
  async transferOwner(groupId: mongoose.Types.ObjectId, user: mongoose.Types.ObjectId){
    const group = await this.findOneById(groupId);
    group.owner = user;
    if(!this.isAdmin(groupId,user)){
      group.admins.push(user);
    }
    group.save();
    return group;
  }

  async editGroup(
    groupName: string,
    displayName: string,
    isPrivate: boolean,
    user: mongoose.Types.ObjectId,
  ) {
    const group = await this.groupModel.findOne({
      groupName: groupName,
    });
    if (!group) {
      throw new NotFoundException('Group does not exist');
    }
    if (!group.admins.find((x) => x.equals(user))) {
      throw new UnauthorizedException('User is not an admin');
    }
    group.displayName = displayName;
    group.isPrivate = isPrivate;
    await group.save();
    return group;
  }

  async deleteGroup(groupName: string, owner: mongoose.Types.ObjectId) {
    const group = await this.groupModel.findOne({
      groupName: groupName,
    });
    if (!group) {
      throw new NotFoundException('Group does not exist');
    }
    if (!group.owner.equals(owner)) {
      throw new UnauthorizedException('User is not group owner');
    }
    await group.deleteOne();
    return STATUS_CODES.Success;;
  }

  async testFun(){
    return STATUS_CODES.Success;
  }
  
  async unfollowGroup(groupName: string, user: mongoose.Types.ObjectId){
    let group = await this.groupModel.findOne({
      groupName: groupName,
    });
    if (!group) {
      throw new BadRequestException('Group does not exist');
    }

    let index = group.followers.indexOf(user);

    if(index === -1){
      throw new BadRequestException('User is not a follower');
    }
    
    group.followers.splice(index, 1);

    await group.save();

    return group;
  }

  async removeAdmin(groupName: string, removeAdminId: mongoose.Types.ObjectId, user: mongoose.Types.ObjectId){
    let group = await this.groupModel.findOne({
      groupName: groupName,
    });
    if (!group) {
      throw new BadRequestException('Group does not exist');
    }
    if (!group.owner.equals(user)) {
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

  async removeFollower(groupName: string, removeFollowerId: mongoose.Types.ObjectId, user: mongoose.Types.ObjectId){
    let group = await this.groupModel.findOne({
      groupName: groupName,
    });
    if (!group) {
      throw new BadRequestException('Group does not exist');
    }
    if (!this.isAdmin(group._id, user)) {
      throw new UnauthorizedException('User is not an admin');
    }
    let index = group.followers.indexOf(removeFollowerId);
    if(index === -1){
      throw new BadRequestException('User is not an follwer');
    }
    
    group.followers.splice(index, 1);

    await group.save();

    return group;

  }
  async getAdminGroups(user: mongoose.Types.ObjectId){
    const groups = this.groupModel.find({admins: user});
    return groups;
  }
  async getFollowGroups(user: mongoose.Types.ObjectId){
    const groups = this.groupModel.find({followers: user});
    return groups;
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
