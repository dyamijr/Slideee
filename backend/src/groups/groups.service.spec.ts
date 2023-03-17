import { Test, TestingModule } from '@nestjs/testing';
import { GroupsService } from './groups.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupSchema } from '../schemas/group.schema';
import { closeInMongodConnection, rootMongooseTestModule } from '../testUtils/mongo/MongooseTestModule';

describe('GroupsService', () => {
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),
      ],
      providers: [GroupsService],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('createGroup', () => {
  //   it('should return a group with username: name, display: name', async () => {
      
  //     jest.spyOn(service, 'createGroup').mockImplementation(() => result);
  //   })
  // });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
