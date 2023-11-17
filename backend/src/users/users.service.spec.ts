import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User, UserDocument, UserSchema } from '../schemas/user.schema';
import { closeInMongodConnection, rootMongooseTestModule } from '../testUtils/mongo/MongooseTestModule';
import { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<UserDocument>;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]), 
      ],
      providers:  [User],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
