import { Model } from 'mongoose';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InvitesService } from 'src/invites/invites.service';
import { InviteType } from '../schemas/invite.schema';
import { EventsService } from 'src/events/events.service';
import { GroupsService } from 'src/groups/groups.service';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class InviteHandlerService {

  constructor(
    private eventService: EventsService,
    private invitesService: InvitesService,
    private groupsService: GroupsService,
    private userService: UsersService,
  ) {}

  async followGroup(groupName: string, user: mongoose.Types.ObjectId){
    let group = await this.groupsService.getIdFromGroupName(groupName);
    if (!await this.groupsService.isValidGroupById(group)) {
      throw new BadRequestException('Group does not exist');
    }
    if(await this.groupsService.isAdmin(group, user)){
      throw new BadRequestException('User is already an admin');
    }
    if(await this.groupsService.isFollower(group, user)){
      throw new BadRequestException('User is already a follower');
    }
    if(!await this.groupsService.isPrivate(group)){
      this.groupsService.addFollower(group._id, user);
    }
    else{
      let invite = this.invitesService.createInvite(
        InviteType.FollowRequest,
        user,
        group,
      );
      return invite;
    }

    return group;
  }

  async addAdmin(groupName: string, userToAdmin: mongoose.Types.ObjectId, user: mongoose.Types.ObjectId){
    let group = await this.groupsService.getIdFromGroupName(groupName);
    if (!await this.groupsService.isValidGroupById(group)) {
      throw new BadRequestException('Group does not exist');
    }
    if(!await this.groupsService.isAdmin(group, user)){
      throw new UnauthorizedException('User is not an admin');
    }
    if(!this.userService.findOneById(userToAdmin)){
      throw new BadRequestException('User does not exist');
    }
    if(await this.groupsService.isAdmin(group, userToAdmin)){
      throw new BadRequestException('User is already an admin');
    }

    let invite = this.invitesService.createInvite(
      InviteType.AdminRequest,
      group,
      userToAdmin,
    );

    return invite;
  }

  async transferOwnership(groupName: string, newOwner: mongoose.Types.ObjectId, user: mongoose.Types.ObjectId){
    let group = await this.groupsService.getIdFromGroupName(groupName);
    if (!await this.groupsService.isValidGroupById(group)) {
      throw new BadRequestException('Group does not exist');
    }
    if(!await this.groupsService.isOwner(group, user)){
      throw new UnauthorizedException('User is not the owner');
    }
    if(!this.userService.findOneById(newOwner)){
      throw new BadRequestException('User does not exist');
    }
    if(await this.groupsService.isOwner(group, newOwner)){
      throw new BadRequestException('User is already owner');
    }

    let invite = this.invitesService.createInvite(
      InviteType.OwnershipRequest,
      group,
      newOwner,
    );

    return invite;
  }
  async acceptInvite(inviteId: string, user: mongoose.Types.ObjectId) {
    //const invite = await this.invitesService.findById(inviteId);
    if (!await this.invitesService.isValidInvite(inviteId)) {
      throw new NotFoundException('Invite does not exist');
    }
    if(await this.invitesService.getInviteStatus(inviteId)){
      throw new BadRequestException('Invite has already been accepted');
    }
    let type = await this.invitesService.getInviteType(inviteId);
    if(type === InviteType.AdminRequest){
      if(await this.invitesService.getInviteRecipient(inviteId) != user){
        throw new UnauthorizedException('Incorrect user');
      }
      let group = await this.invitesService.getInviteSender(inviteId);
      if(!await this.groupsService.isValidGroupById(group)){
        throw new BadRequestException('Group does not exist');
      }
      await this.groupsService.addAdmin(group, user);
    }
    else if(type === InviteType.FollowRequest){
      let group = await this.invitesService.getInviteRecipient(inviteId);
      let follower = await this.invitesService.getInviteSender(inviteId);
      if(!await this.groupsService.isValidGroupById(group)){
        throw new BadRequestException('Group does not exist');
      }
      if(!await this.groupsService.isAdmin(group, user)){
        throw new UnauthorizedException('User is not an admin');
      }
      await this.groupsService.addFollower(group, follower);
    }
    else if(type === InviteType.CollaboratorRequest){
      let group1 = await this.invitesService.getInviteSender(inviteId);
      let group2 = await this.invitesService.getInviteRecipient(inviteId);
      if(!await this.groupsService.isValidGroupById(group1) || !await this.groupsService.isValidGroupById(group2)){
        throw new BadRequestException('Group does not exist');
      }
      if(!await this.groupsService.addAdmin(group2, user)){
        throw new UnauthorizedException('User is not an admin');
      }
      let event = await this.invitesService.getInviteContent(inviteId);
      if(!await this.eventService.isValidEvent(event)){
        throw new BadRequestException('Event does not exist');
      }
      await this.eventService.addColloborator(event, group2);
    }
    else if(type === InviteType.OwnershipRequest){
      if(await this.invitesService.getInviteRecipient(inviteId) != user){
        throw new UnauthorizedException('Incorrect user');
      }
      let group = await this.invitesService.getInviteSender(inviteId);
      if(!await this.groupsService.isValidGroupById(group)){
        throw new BadRequestException('Group does not exist');
      }
      await this.groupsService.transferOwner(group, user);
    }
    else{
      throw new BadRequestException('Unknown exception type'); 
    }
    
    let invite = this.invitesService.acceptInvite(inviteId);
    return invite;
  }

  async createEvent(
    title: string,
    description: string,
    collaboratorsGroupNames: string[],
    admin: mongoose.Types.ObjectId,
  ) {
    const collaboratorsGroupDocuments: mongoose.Types.ObjectId[] = [];
    for (const collaboratorGroupName of collaboratorsGroupNames) {
      const group = await this.groupsService.getIdFromGroupName(collaboratorGroupName);
      if (!await this.groupsService.isValidGroupById(group)) {
        throw new BadRequestException(
          `Group Not Found: ${collaboratorGroupName}`,
        );
      }
      collaboratorsGroupDocuments.push(group);
    }
    const isUserGroupAdmin = await this.groupsService.isAdmin(collaboratorsGroupDocuments[0], admin);
    if (!isUserGroupAdmin) {
      throw new UnauthorizedException();
    }

    const createdEventId = await this.eventService.create(title, description, collaboratorsGroupDocuments[0], admin);

    for (let i = 1; i < collaboratorsGroupDocuments.length; i++) {
      this.invitesService.createInvite(
        InviteType.CollaboratorRequest,
        collaboratorsGroupDocuments[0],
        collaboratorsGroupDocuments[i],
        createdEventId,
      );
    }
    return createdEventId;
  }
}
