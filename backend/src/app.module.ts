import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EventsController } from './events/events.controller';
import { EventsModule } from './events/events.module';
import { GroupsModule } from './groups/groups.module';
import { UsersController } from './users/users.controller';
import { InvitesModule } from './invites/invites.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://0.0.0.0:27017', {
      dbName: 'slideee',
    }),
    AuthModule,
    GroupsModule,
    InvitesModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
