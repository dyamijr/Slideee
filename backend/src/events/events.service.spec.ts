import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { BadRequestException } from '@nestjs/common';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('createNewEvent', () => {
  it('should return an event with title: title, description: description', async () => {
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
    
    const title = 'title';
    const desc = 'description';
    const collab = [group];

    const createEvent = async () => {
      await service.create(title, desc, collab, user._id);
    };

    expect(title).toEqual(createEvent.title);
    expect(desc).toEqual(createEvent.description);
    expect(collab[0]._id).toEqual(createEvent.collaboratorsGroupNames[0]._id);
    expect(user._id).toEqual(admin._id);
  }) 
});

describe('createDuplicateEvent', () => {
  it('should throw a BadRequest error', async () => {
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

    const title = 'title';
    const description = 'description';
    const collab = [group];

    let event = new eventModel({
      title: title,
      description: description,
      collaboratorGroupName: collab,
      admin: user._id,
    });

    const createEvent = async () => {
      await service.create(title, desc, collab, user._id);
    };

    await expect(createEvent()).rejects.toThrow(BadRequestException);
  })
});

describe('findExistingEvent', () => {
  it('should return an event with title: title, description: description', async () => {
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

    const title = 'title';
    const description = 'description';
    const collab = [group];

    let event = new eventModel({
      title: title,
      description: description,
      collaboratorGroupName: collab,
      admin: user._id,
    });

    const createEvent = async () => {
      await service.create(title, desc, collab, user._id);
    };

    const found = async () => {
      await service.findOne(createEvent._id);
    }

    expect(title).toEqual(found.title);
    expect(description).toEqual(found.description);
    expect(user._id).toEqual(found.admin)
  })
})

describe('findNonExistingEvent', () => {
  it('should return null', async () => {
    const id = 'foolishness'

    const found = async () => {
      await service.findOne(createEvent._id);
    }

    expect(found).toEqual(null);
  })
})