import { Test, TestingModule } from '@nestjs/testing';
import { GroupInvitesService } from './groupInvites.service';

describe('GroupsService', () => {
  let service: GroupInvitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupInvitesService],
    }).compile();
    service = module.get<GroupInvitesService>(GroupInvitesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
