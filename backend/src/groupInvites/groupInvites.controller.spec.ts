import { Test, TestingModule } from '@nestjs/testing';
import { GroupInvitesController } from './groupInvites.controller';
import { GroupInvitesService } from './groupInvites.service';
import { closeInMongodConnection, rootMongooseTestModule } from '../testUtils/mongo/MongooseTestModule';

describe('GroupInvitesController', () => {
  let controller: GroupInvitesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupInvitesController],
      providers: [GroupInvitesService],
    }).compile();

    controller = module.get<GroupInvitesController>(GroupInvitesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
