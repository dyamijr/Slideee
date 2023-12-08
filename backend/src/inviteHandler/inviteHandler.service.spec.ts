import { Test, TestingModule } from '@nestjs/testing';
import { InviteHandlerService } from './inviteHandler.service';

describe('GroupsService', () => {
  let service: InviteHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InviteHandlerService],
    }).compile();
    service = module.get<InviteHandlerService>(InviteHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    
  });
});
