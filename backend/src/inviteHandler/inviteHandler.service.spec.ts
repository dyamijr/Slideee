import { Test, TestingModule } from '@nestjs/testing';
import { InviteHandlerService } from './inviteHandler.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Group, GroupDocument, GroupSchema } from '../schemas/group.schema';
import { closeInMongodConnection, rootMongooseTestModule } from '../testUtils/mongo/MongooseTestModule';
import { User, UserDocument, UserSchema } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Invite ,InviteDocument, InviteType } from '../schemas/invite.schema';
import { InvitesService } from '../invites/invites.service';
import { EventsService } from 'src/events/events.service';

describe('GroupsService', () => {
  let service: InviteHandlerService;
  let inviteService: InvitesService;
  let userModel: Model<UserDocument>;
  let groupModel: Model<GroupDocument>;
  let inviteModel: Model<InviteDocument>;
  let eventsService: EventsService;
  let module: TestingModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InviteHandlerService, InvitesService, EventsService],
    }).compile();
    service = module.get<InviteHandlerService>(InviteHandlerService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    groupModel = module.get<Model<GroupDocument>>(getModelToken(Group.name));
    eventsService = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('followGroup', () => {
    it('should define return a group with username: name, display: name', async () => {
      const groupName = "groupName";
      const displayName = "displayName";

      const owner = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });

      let group = new groupModel({
        groupName: groupName,
        displayName: displayName,
        isPrivate: true,
        owner: owner, 
        admins: [owner],
        followers: [],
      });
      await group.save();

      const followed = await service.followGroup(groupName, owner._id);
      expect(followed._id).toEqual(group._id);
    })
  });

  describe('followNonExistingGroup', () => {
    it('should return an Exception', async () => {

    })
  });

  describe('followGroupAsAdmin', () => {
    it('should return an Exception', async () => {

    })
  });

  describe('followGroupTwice', () => {
    it('should return an Exception', async () => {

    })
  });

  describe('followPrivateGroup', () => {
    it('should return an Exception', async () => {

    })
  });

  describe('addAdmin', () => {
    it('should return an invite', async () => {
      const groupName = "groupName";
      const displayName = "displayName";

      const owner = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });

      const admin = new userModel({
        username: "admin",
        displayName: "Name",
        password: "password",
      });

      let group = new groupModel({
        groupName: groupName,
        displayName: displayName,
        isPrivate: true,
        owner: owner,
        admins: [owner],
        followers: [],
      });
      await group.save();

      let createdInvite = new inviteModel({
        type: InviteType.AdminRequest,
        sender: owner._id,
        recipient: admin._id,
      })

      const added = await service.addAdmin(groupName, admin._id, owner._id);

      expect(createdInvite.type).toEqual(inviteService.getInviteType(added.toString()));
      expect(createdInvite.sender).toEqual(inviteService.getInviteSender(added.toString()));
      expect(createdInvite.recipient).toEqual(inviteService.getInviteRecipient(added.toString()));
    })
  });

  describe('addNonExistingAdmin', () => {
    it('should return an Exception', async () => {
    
    })
  });

  describe('acceptAdminInvite', () => {
    it('should return an invite', async () => {
      
    })
  }); 

  describe('acceptFollowRequest', () => {
    it('should return an invite', async () => {

    })
  });

  describe('acceptCollabRequest', () => {
    it('should return an invite', async () => {

    })
  });

  describe('acceptNonExistingInviteType', () => {
    it('should return an Exception', async () => {

    })
  });

  describe('createEvent', () => {
    it('should return an invite', async () => {

    })
  });
});
