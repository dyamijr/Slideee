import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from '../events/events.controller';
import { EventsService } from '../events/events.service';
import { closeInMongodConnection, rootMongooseTestModule } from '../testUtils/mongo/MongooseTestModule';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

describe('EventsController', () => {
  let controller: EventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [EventsService],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
