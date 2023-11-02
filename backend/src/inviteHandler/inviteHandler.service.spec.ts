import { Test, TestingModule } from '@nestjs/testing';
import { InviteHandlerService } from './inviteHandler.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Group, GroupDocument, GroupSchema } from '../schemas/group.schema';
import { closeInMongodConnection, rootMongooseTestModule } from '../testUtils/mongo/MongooseTestModule';
import { User, UserDocument, UserSchema } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Invite ,InviteDocument, InviteType } from 'src/schemas/invite.schema';
import { InvitesService } from 'src/invites/invites.service';

describe('GroupsService', () => {
  let service: InviteHandlerService;
  let inviteService: InvitesService;
  let userModel: Model<UserDocument>;
  let groupModel: Model<GroupDocument>;
  let inviteModel: Model<InviteDocument>;
  let module: TestingModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InviteHandlerService, InvitesService],
    }).compile();
    service = module.get<InviteHandlerService>(InviteHandlerService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    groupModel = module.get<Model<GroupDocument>>(getModelToken(Group.name));
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

  describe('acceptInvite', () => {
    it('should return an invite', async () => {
      
    })
  }); 

  describe('createEvent', () => {
    it('should return an invite', async () => {

    })
  });
});
