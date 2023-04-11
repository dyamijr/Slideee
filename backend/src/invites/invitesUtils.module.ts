import { Module } from '@nestjs/common';
import { InvitesUtilService } from './inviteUtils.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from '../schemas/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  controllers: [],
  providers: [InvitesUtilService],
  exports: [InvitesUtilService],
})
export class InvitesUtilModule {}
