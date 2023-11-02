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
  //Testing create group
  describe('createGroup', () => {
    it('should return a group with username: name, display: name', async () => {

      const groupName = "groupName";
      const displayName = "displayName";
      const user = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });

      const group = await service.createGroup(groupName, displayName, true, user._id);

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

      let group = new groupModel({
        groupName: groupName,
        displayName: displayName,
        isPrivate: true,
        owner: user, 
        admins: [user],
        followers: [],
      });
      await group.save();
      
      const createGroup  = async () => {
        await service.createGroup(groupName, displayName, true, user._id);
      };

      await expect(createGroup()).rejects.toThrow(BadRequestException);

    })
  });

  //Testing findOneByName
  describe('findNonExistentGroupName', () => {
    it('should return null', async () => {
      
      const groupName = "nonExistent";

      const group = async () => {
        await service.findOneByGroupName(groupName);
      };

      expect(group).toBeNull();
    })
  });

  describe('findByExistingGroupName', () => {
    it('should return a group with username: name, display: name', async () => {

      const groupName = "groupName";
      const displayName = "displayName";
      const isPrivate = true;

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

      const find = await service.findOneByGroupName(groupName);

      expect(groupName).toEqual(find.groupName);
      expect(displayName).toEqual(find.displayName);
      expect(group.isPrivate).toBeTruthy();
      expect(owner._id).toEqual(find.owner)
    })
  });

  describe('findByExistingGroupId', () => {
    it('should return a group with username: name, display: name', async () => {
        
      const groupName = "groupName";
      const displayName = "displayName";
      const isPrivate = true;

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

      const find = await service.findOneByGroupName(groupName);

      expect(find.groupName).toEqual(groupName);
      expect(find.displayName).toEqual(displayName);
      expect(find.isPrivate).toBeTruthy();
      expect(owner._id).toEqual(find.owner);
    })
  });
  
  
  //Testing edit group
  describe('editNonExistentGroup', () => {
    it('should throw a BadRequestException', async () => {

      const groupName = "groupName";
      const displayName = "displayName";

      const user = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });
      
      const editGroup  = async () => {
        await service.editGroup(groupName, displayName, true, user._id);
      };

      await expect(editGroup()).rejects.toThrow(BadRequestException);

    })
  });

  describe('editGroupAsNonAdmin', () => {
    it('should throw a BadRequestException', async () => {

      const groupName = "groupName";
      const displayName = "displayName";

      const user = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });

      const editUser = new userModel({
        username: "username1",
        displayName: "displayName1",
        password: "password1",
      });

      let group = new groupModel({
        groupName: groupName,
        displayName: displayName,
        isPrivate: true,
        owner: user, 
        admins: [user],
        followers: [],
      });
      await group.save();
      
      const editGroup  = async () => {
        await service.editGroup(groupName, "newdisplayname", false, editUser._id);
      };

      await expect(editGroup()).rejects.toThrow(BadRequestException);

    })
  });

  describe('editGroup', () => {
    it('group should update to displayName = editDisplayName, and isPrivate = false', async () => {

      const groupName = "groupName";
      const displayName = "displayName";

      const user = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });

      let group = new groupModel({
        groupName: groupName,
        displayName: displayName,
        isPrivate: true,
        owner: user, 
        admins: [user],
        followers: [],
      });
      await group.save();

      const editDisplayName = "newDisplayName";

      await service.editGroup(groupName, editDisplayName, false, user._id);

      group = await groupModel.findById(group._id);

      expect(group.groupName).toEqual(groupName);
      expect(group.displayName).toEqual(editDisplayName);
      expect(!group.isPrivate).toBeTruthy();
      expect(user._id).toEqual(group.owner);
    })
  });
  //Testing Delete Group
  describe('deleteNonExistentGroup', () => {
    it('should throw a BadRequestException', async () => {

      const groupName = "groupName";
      const displayName = "displayName";

      const user = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });
      
      const deleteGroup  = async () => {
        await service.deleteGroup(groupName, user._id);
      };

      await expect(deleteGroup()).rejects.toThrow(BadRequestException);

    })
  });

  describe('deleteGroupAsNonAdmin', () => {
    it('should throw a BadRequestException', async () => {

      const groupName = "groupName";
      const displayName = "displayName";

      const user = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });

      const removeUser = new userModel({
        username: "username1",
        displayName: "displayName1",
        password: "password1",
      });

      let group = new groupModel({
        groupName: groupName,
        displayName: displayName,
        isPrivate: true,
        owner: user, 
        admins: [user],
        followers: [removeUser],
      });
      await group.save();
      
      const deleteGroup  = async () => {
        await service.deleteGroup(groupName, removeUser._id);
      };

      await expect(deleteGroup()).rejects.toThrow(BadRequestException);

    })
  });

  describe('deleteGroupAsAdmin', () => {
    it('should throw a BadRequestException', async () => {

      const groupName = "groupName";
      const displayName = "displayName";

      const user = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });

      const removeUser = new userModel({
        username: "username1",
        displayName: "displayName1",
        password: "password1",
      });

      let group = new groupModel({
        groupName: groupName,
        displayName: displayName,
        isPrivate: false,
        owner: user, 
        admins: [user, removeUser],
        followers: [],
      });
      await group.save();
      
      const deleteGroup  = async () => {
        await service.deleteGroup(groupName, removeUser._id);
      };

      await expect(deleteGroup()).rejects.toThrow(BadRequestException);

    })
  });

  describe('deleteGroup', () => {
    it('group should be removed with succsess exit status', async () => {

      const groupName = "groupName";
      const displayName = "displayName";

      const user = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });

      let group = new groupModel({
        groupName: groupName,
        displayName: displayName,
        isPrivate: false,
        owner: user, 
        admins: [user],
        followers: [],
      });
      await group.save();

      const ret = await service.deleteGroup(groupName, user._id);

      group = await groupModel.findById(group._id);

      expect(group).toBeNull();
      expect(ret).toEqual("Success");
    })
  });

  //Testing Unfollow Group
  describe('unfollowNonExistentGroup', () => {
    it('should throw a BadRequestException', async () => {

      const groupName = "groupName";
      const displayName = "displayName";

      const followUser = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });
      
      const unfollowGroup  = async () => {
        await service.unfollowGroup(groupName, followUser._id);
      };

      await expect(unfollowGroup()).rejects.toThrow(BadRequestException);

    })
  });

  describe('unfollowGroupAsNonFollower', () => {
    it('should throw a BadRequestException', async () => {

      const groupName = "groupName";
      const displayName = "displayName";

      const user = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });

      const followUser = new userModel({
        username: "username1",
        displayName: "displayName1",
        password: "password1",
      });

      let group = new groupModel({
        groupName: groupName,
        displayName: displayName,
        isPrivate: false,
        owner: user, 
        admins: [user],
        followers: [],
      });
      await group.save();
      
      const unfollowGroup  = async () => {
        await service.unfollowGroup(groupName, followUser._id);
      };

      await expect(unfollowGroup()).rejects.toThrow(BadRequestException);

    })
  });

  describe('unfollowGroup', () => {
    it('user should be removed from the groups followers', async () => {

      const groupName = "groupName";
      const displayName = "displayName";

      const user = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });

      const followUser = new userModel({
        username: "username1",
        displayName: "displayName1",
        password: "password1",
      });

      let group = new groupModel({
        groupName: groupName,
        displayName: displayName,
        isPrivate: false,
        owner: user, 
        admins: [user],
        followers: [followUser],
      });
      await group.save();

      await service.unfollowGroup(groupName, followUser._id);

      group = await groupModel.findById(group._id);

      expect(group.followers).toHaveLength(0);
    })
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});



