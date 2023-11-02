import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';
import { closeInMongodConnection, rootMongooseTestModule } from '../testUtils/mongo/MongooseTestModule';
import { Group, GroupDocument, GroupSchema } from '../schemas/group.schema';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from '../schemas/user.schema';
import { Event, EventDocument, EventSchema } from '../schemas/event.schema';

describe('EventsService', () => {
  let service: EventsService;
  let userModel: Model<UserDocument>;
  let groupModel: Model<GroupDocument>;
  let eventModel: Model<EventDocument>;

  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }, {name: 'User', schema: UserSchema}, {name: 'Group', schema: GroupSchema}]), 
      ],
      providers: [EventsService, Group, User],
    }).compile();


    service = module.get<EventsService>(EventsService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    groupModel = module.get<Model<GroupDocument>>(getModelToken(Group.name));
    eventModel = module.get<Model<EventDocument>>(getModelToken(Event.name));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNewEvent', () => {
    it('should return an event with title: title, description: description', async () => {

      const user = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });

      let group = new groupModel({
        groupName: 'groupName',
        displayName: 'displayName',
        isPrivate: true,
        owner: user, 
        admins: [user],
        followers: [],
      });
      await group.save();
      
      const title = 'title';
      const desc = 'description';

      const createEvent = await service.create(title, desc, group._id, user._id);
      const event = await service.findById((createEvent))

      expect(title).toEqual(event.title);
      expect(desc).toEqual(event.description);
      expect(group._id).toEqual(event.collaborators[0]._id);
      expect(user._id).toEqual(event.createdBy[0]);
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
        groupName: 'groupName',
        displayName: 'displayName',
        isPrivate: true,
        owner: user, 
        admins: [user],
        followers: [],
      });
      await group.save();

      const title = 'title';
      const desc = 'description';
      const collab = group._id;

      let event = new eventModel({
        title: 'title',
        description: 'description',
        collaboratorGroupName: collab,
        createdBy: user._id,
      });
      await event.save();

      const found = await service.findById((event._id))

      expect(title).toEqual(found.title);
      expect(desc).toEqual(found.description);
      expect(user._id).toEqual(found.createdBy[0]);
    })
  })

  describe('addCollaborator', () => {
    it('should return title with title: title, description: description', async () => {
      const owner = new userModel({
        username: "username",
        displayName: "displayName",
        password: "password",
      });

      const co = new userModel({
        username: "user",
        displayName: "displayName",
        passpord: "password",
      })

      let group = new groupModel({
        groupName: 'groupName',
        displayName: 'displayName',
        isPrivate: true,
        owner: owner, 
        admins: [owner],
        followers: [],
      });
      await group.save();

      const title = 'title';
      const desc = 'description';
      const collab = group._id;

      let event = new eventModel({
        title: 'title',
        description: 'description',
        collaboratorGroupName: collab,
        createdBy: owner._id,
      });
      await event.save();

      const collaborator = await service.addColloborator(event._id, co._id)

      expect(title).toEqual(collaborator.title);
      expect(desc).toEqual(collaborator.description);
      expect(owner._id).toEqual(collaborator.createdBy[0]);
      expect(co._id).toEqual(collaborator.collaborators[0]);
    })
  })

  describe('findExistingEvent', () => {
    it('should return an event with title: title, description: description', async () => {
      const user = new userModel({
          username: "username",
          displayName: "displayName",
          password: "password",
        });

      let group = new groupModel({
        groupName: 'groupName',
        displayName: 'displayName',
        isPrivate: true,
        owner: user, 
        admins: [user],
        followers: [],
      });
      await group.save();

      const title = 'title';
      const desc = 'description';
      const collab = group._id;

      let event = new eventModel({
        title: 'title',
        description: 'description',
        collaboratorGroupName: collab,
        createdBy: user._id,
      });
      await event.save();

      const found = await service.isValidEvent((event._id))

      expect(found).toBeTruthy;
    })
  })
});

