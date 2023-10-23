import { Module, forwardRef } from '@nestjs/common';
import { InviteHandlerService } from './inviteHandler.service';
import { InviteHandlerController } from './inviteHandler.controller';
import { InvitesModule } from 'src/invites/invites.module';
import { GroupsModule } from 'src/groups/groups.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { EventsModule } from 'src/events/events.module';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [
    GroupsModule, 
    InvitesModule,
    EventsModule,
    UsersModule
  ],
  controllers: [InviteHandlerController],
  providers: [InviteHandlerService],
  exports: [InviteHandlerService],
})
export class InviteHandlerModule {}
