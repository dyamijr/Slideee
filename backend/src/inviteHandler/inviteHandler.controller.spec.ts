import { Test, TestingModule } from '@nestjs/testing';
import { InviteHandlerController } from '../inviteHandler/inviteHandler.controller';
import { InviteHandlerService } from '../inviteHandler/inviteHandler.service';
import { closeInMongodConnection, rootMongooseTestModule } from '../testUtils/mongo/MongooseTestModule';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { InviteSchema } from '../schemas/invite.schema';
import { EventsService } from '../events/events.service';

describe('InviteHandlerController', () => {
  let controller: InviteHandlerController;
  let eventsService: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Invite', schema: InviteSchema }]), 
      ],
      controllers: [InviteHandlerController],
      providers: [InviteHandlerService, EventsService],
    }).compile();

    controller = module.get<InviteHandlerController>(InviteHandlerController);
    eventsService = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
