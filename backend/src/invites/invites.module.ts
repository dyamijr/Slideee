import { Module } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Invite, InviteSchema } from '../schemas/invite.schema';
import { InvitesUtilModule } from './invitesUtils.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
    InvitesUtilModule,
  ],
  controllers: [InvitesController],
  providers: [InvitesService],
  exports: [InvitesService],
})
export class InvitesModule {}
