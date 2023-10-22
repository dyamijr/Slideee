import { Test, TestingModule } from '@nestjs/testing';
import { GroupsService } from './groups.service';

describe('GroupsService', () => {
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsService],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
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

      expect(group).toEqual(null);
    })
  });
  
  describe('findByExistingGroupName', () => {
    it('should return the accurate group details', async () => {

      const groupName = "groupName";
      const displayName = "displayName";
      const isPrivate = true;

      const owner = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });

      await service.createGroup(groupName, displayName, isPrivate, owner._id);

      const group = async () => {
        await service.findOneByGroupName(groupName);
      };

      expect(group.groupName).toEqual(groupName);
      expect(group.displayName).toEqual(displayName);
      expect(group.isPrivate).toBeTruthy();
      expect(owner._id).toEqual(group.owner)
    })
  });

//Testing findOneById
  describe('findNonExistentGroupId', () => {
    it('should should return null', async () => {

      const groupId = 'foolishness';

      const group = async () => {
        await service.findOneByGroupName(groupName);
      };

      expect(group).toEqual(null);
    })
  });


  describe('findByExistingGroupId', () => {
    it('should return the accurate group details', async () => {
        
      const groupName = "groupName";
      const displayName = "displayName";
      const isPrivate = true;

      const owner = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });

      const createdGroup = await service.createGroup(groupName, displayName, isPrivate, owner._id);

      const groupId = createdGroup._id,
      const group = async () => {
        await service.findOneById(groupId);
      };
      expect(group.groupName).toEqual(groupName);
      expect(group.displayName).toEqual(displayName);
      expect(group.isPrivate).toBeTruthy();
      expect(owner._id).toEqual(group.owner);
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
