import { Test, TestingModule } from '@nestjs/testing';
import { InviteHandlerController } from './inviteHandler.controller';
import { InviteHandlerService } from './inviteHandler.service';
import { closeInMongodConnection, rootMongooseTestModule } from '../testUtils/mongo/MongooseTestModule';

describe('InviteHandlerController', () => {
  let controller: InviteHandlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InviteHandlerController],
      providers: [InviteHandlerService],
    }).compile();

    controller = module.get<InviteHandlerController>(InviteHandlerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
