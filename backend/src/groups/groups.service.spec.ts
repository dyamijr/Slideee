import { Test, TestingModule } from '@nestjs/testing';
import { GroupsService } from './groups.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Group, GroupDocument, GroupSchema } from '../schemas/group.schema';
import { closeInMongodConnection, rootMongooseTestModule } from '../testUtils/mongo/MongooseTestModule';
import { User, UserDocument, UserSchema } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('GroupsService', () => {
  let service: GroupsService;
  let userModel: Model<UserDocument>;
  let groupModel: Model<GroupDocument>;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }, {name: 'User', schema: UserSchema}]), 
      ],
      providers: [GroupsService, Group, User],
    }).compile();


    service = module.get<GroupsService>(GroupsService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    groupModel = module.get<Model<GroupDocument>>(getModelToken(Group.name));
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createGroup', () => {
    it('should return a group with username: name, display: name', async () => {

      const groupName = "groupName";
      const displayName = "displayName";
      const user = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });

      const group = await service.createGroup("groupName", "displayName", true, user);

      expect(groupName).toEqual(group.groupName);
      expect(displayName).toEqual(group.displayName);
      expect(group.isPrivate).toBeTruthy();
      expect(user._id).toEqual(group.owner);
    })
  });

  describe('createDuplicateGroup', () => {
    it('should throw a BadRequest error', async () => {

      const groupName = "groupName";
      const displayName = "displayName";

      const user = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });

      const group = new groupModel({
        groupName: groupName,
        displayName: displayName,
        isPrivate: true,
        owner: user, 
        admins: [user],
        followers: [],
      });

      try {
        await service.createGroup("groupName", "displayName", true, user);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    })
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
