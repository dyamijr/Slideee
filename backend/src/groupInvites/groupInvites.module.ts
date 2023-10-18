import { Module, forwardRef } from '@nestjs/common';
import { GroupInvitesService } from './groupInvites.service';
import { GroupInvitesController } from './groupInvites.controller';
import { InvitesModule } from 'src/invites/invites.module';
import { GroupsModule } from 'src/groups/groups.module';
import { InvitesService } from 'src/invites/invites.service';
import { Group, GroupSchema } from '../schemas/group.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Invite, InviteSchema } from 'src/schemas/invite.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
    GroupsModule, 
    InvitesModule,
  ],
  controllers: [GroupInvitesController],
  providers: [GroupInvitesService],
  exports: [GroupInvitesService],
})
export class GroupInvitesModule {}
